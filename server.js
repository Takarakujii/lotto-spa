import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import { io as client_io } from 'socket.io-client';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/v1';
const PRIMARY = 3000;
const isPRIMARY = process.env.PORT == PRIMARY;
const IS_PRODUCTION = process.env.ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const countdownState = {
  countdown: 60,
  interval: null,
  io: null,
  slaves: new Set(),
  latestPot: null,
};

async function fetchPotAmount() {
    try {
        const response = await axios.get(`${API_BASE_URL}/pot`, {
            headers: { apikey: "hotdog" },
            withCredentials: true
        });

        if (!response.data?.success) throw new Error("Failed to fetch pot amount");
        return response.data.potAmount || 0;
    } catch (error) {
        console.error("❌ Error fetching pott:", error);
        return 0;
    }
}



const startCountdown = () => {
    if (countdownState.interval || !isPRIMARY) return;

    countdownState.interval = setInterval(async () => {
        if (countdownState.countdown > 0) {
            countdownState.countdown--;
        } else {
            clearInterval(countdownState.interval);
            countdownState.interval = null;

            
            countdownState.countdown = 60;
            startCountdown();
        }

        const potAmount = await fetchPotAmount();
        countdownState.latestPot = { amount: potAmount };
        countdownState.io.emit("Pot", { amount: potAmount });

        countdownState.io.emit("countdownUpdate", countdownState.countdown);
        countdownState.slaves.forEach(slave => slave.emit("countdownUpdate", countdownState.countdown));

    }, 1000);
};

async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: '*', methods: ['GET', 'POST'] }
  });

  if (!countdownState.io) countdownState.io = io;

  let primarySocket;
  if (!isPRIMARY) {
    primarySocket = client_io(`http://localhost:${PRIMARY}`);

    primarySocket.on("countdownUpdate", (countdown) => {
      countdownState.countdown = countdown;
      countdownState.io.emit("countdownUpdate", countdown);
    });

    primarySocket.on("Pot", (potData) => {
      countdownState.latestPot = potData;
      countdownState.io.emit("Pot", potData);
      // console.log("slave recieve data from primary hhahahahaha", potData);
    });

    primarySocket.emit("requestPot");
    console.log(`✅ Slave connected to Primary at ${PRIMARY}`);
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
        path.resolve(__dirname, IS_PRODUCTION ? './dist/client/index.html' : './index.html'),
        'utf-8'
      );

      let render, template;
      if (IS_PRODUCTION) {
        template = index;
        render = (await import('./dist/server/server-entry.js')).render;
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

    if (isPRIMARY) {
      countdownState.slaves.add(socket);
      socket.emit('countdownUpdate', countdownState.countdown);

      socket.on("requestPot", async () => {
        if (countdownState.latestPot) {
          socket.emit("Pot", countdownState.latestPot);
          // console.log("reqesting pot", countdownState.latestPot);
        }
      });
    } else {
      socket.emit("countdownUpdate", countdownState.countdown);
      if (countdownState.latestPot) socket.emit("Pot", countdownState.latestPot);
    }

    socket.on('disconnect', () => {
      countdownState.slaves.delete(socket);
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  if (isPRIMARY && !countdownState.interval) {
    startCountdown();
  }

  console.log(`✅ Server running on port ${process.env.PORT}`);
  server.listen(process.env.PORT);
}

createCustomServer();
console.log('✅ Server initialization started');
console.log('✅ Environment:', process.env.ENV);
console.log('✅ Current directory:', __dirname);
console.log('✅ IS_PRODUCTION:', IS_PRODUCTION);
