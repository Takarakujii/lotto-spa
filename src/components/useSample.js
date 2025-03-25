//server/server.js

/* eslint no-restricted-globals: ["error", "event"] */
/* global process */

import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import { io as ClientIO } from 'socket.io-client';
import { handleSocketEvents } from './auth/userController.js';
import { rollCubes, fetchLastResults, fetchLatestDraw, placeBet } from './events/socketEvents.js';
import { updateJackpot } from './events/utilities.js';

const IS_PRODUCTION = process.env.ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MASTER_PORT = 3000;
const isMaster = process.env.PORT == MASTER_PORT;

const countdownState = {
  countdown: 60,
  interval: null,
  io: [],
  slaves: []
};

const startCountdown = () => {
  if (countdownState.interval || !isMaster) return;

  countdownState.interval = setInterval(async () => {
    if (countdownState.countdown > 0) {
      countdownState.countdown--;
    } else {
      clearInterval(countdownState.interval);
      countdownState.interval = null;

      // Master rolls cubes and determines winners
      const result = await rollCubes(countdownState.io[0]);

      // Emit results to clients and slaves
      countdownState.io.forEach(io => io.emit("cubeRoll", result));
      countdownState.slaves.forEach(slave => slave.emit("cubeRoll", result));

      countdownState.countdown = 60;
      startCountdown();
    }

    // Emit countdown updates
    countdownState.io.forEach(io => io.emit("countdownUpdate", countdownState.countdown));
    countdownState.slaves.forEach(slave => slave.emit("countdownUpdate", countdownState.countdown));
  }, 1000);
};

async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, { cors: { origin: "*" } });

  countdownState.io.push(io);
  let masterSocket;

  if (!isMaster) {
    masterSocket = ClientIO(`http://localhost:${MASTER_PORT}`);

    masterSocket.on("countdownUpdate", (countdown) => {
      countdownState.countdown = countdown;
      countdownState.io.forEach(io => io.emit("countdownUpdate", countdown));
    });

    masterSocket.on("newDraw", (result) => {
      countdownState.io.forEach(io => io.emit("newDraw", result));
    });

    masterSocket.on("bettingHistoryUpdate", (data) => {
      countdownState.io.forEach(io => io.emit("bettingHistoryUpdate", data));
    });

    masterSocket.on("jackpotUpdate", (data) => {
      countdownState.io.forEach(io => io.emit("jackpotUpdate", data));
    });

    console.log(`Slave instance connected to Master at ${MASTER_PORT}`);
  }

  let vite;
  if (IS_PRODUCTION) {
    app.use(express.static(path.resolve(__dirname, './dist/client/'), { index: false }));
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      build: { ssr: true, ssrEmitAssets: true }
    });

    app.use(vite.middlewares);
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const index = fs.readFileSync(
        path.resolve(__dirname, IS_PRODUCTION ? '../dist/client/index.html' : '../index.html'),
        'utf-8'
      );

      let render, template;
      if (IS_PRODUCTION) {
        template = index;
        render = await import('./dist/server/server-entry.js').then(mod => mod.render);
      } else {
        template = await vite.transformIndexHtml(url, index);
        render = (await vite.ssrLoadModule('/src/server-entry.jsx')).render;
      }

      const context = {};
      const appHtml = render(url, context);
      const html = template.replace('<!-- ssr -->', appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} on port ${process.env.PORT}`);
    handleSocketEvents(socket, io);
    fetchLastResults(io);
    fetchLatestDraw(io);
    updateJackpot(io);

    if (isMaster) {
        countdownState.slaves.push(socket);
        socket.emit('countdownUpdate', countdownState.countdown);

        socket.on("placeBet", (betData) => {
            placeBet(socket, betData); 
        });

    } else {
        socket.emit("countdownUpdate", countdownState.countdown);

        socket.on("placeBet", (betData) => {
            console.log(`Forwarding placeBet from ${process.env.PORT} to Master`);
            if (masterSocket) {
                masterSocket.emit("placeBet", betData);
            }
        });

        masterSocket.on("betResponse", (response) => {
            socket.emit("betResponse", response);
        });

        masterSocket.on("bettingHistoryUpdate", (data) => {
            socket.emit("bettingHistoryUpdate", data);
        });

        masterSocket.on("jackpotUpdate", (data) => {
            socket.emit("jackpotUpdate", data);
        });
    }
});


  if (isMaster && !countdownState.interval) {
    startCountdown();
  }

  console.log(`Server running on port ${process.env.PORT}`);
  server.listen(process.env.PORT);
}

createCustomServer();