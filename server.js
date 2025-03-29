import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import { io as client_io } from 'socket.io-client';
import { fetchPotAmount } from './src/service/FetchPot.js';

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

async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    },
  });

  if (!countdownState.io) {
    countdownState.io = io;
  }

  let primarySocket;
  if (!isPRIMARY) {
    primarySocket = client_io(`http://localhost:${PRIMARY}`);

    primarySocket.on("countdownUpdate", (countdown) => {
        countdownState.countdown = countdown;
        countdownState.io.emit("countdownUpdate", countdown);
    });

    primarySocket.on("Pot", (potData) => {
        console.log("✅ Slave received Pot:", potData);
        countdownState.latestPot = potData;  

        countdownState.io.emit("Pot", potData);
    });

    // ✅ Request sa latest Pot on connection
    primarySocket.emit("requestPot");

    console.log(`✅ Slave connected to Primary at ${PRIMARY}`);

    // ✅ Handle Disconnection na irereset  ang countdown and pot to 0
    primarySocket.on("disconnect", () => {
        console.log("❌ Lost connection to Primary Server! Resetting countdown and pot.");
        
        countdownState.countdown = 0;
        countdownState.latestPot = { amount: 0 };

        // Notify all connected clients of reset
        countdownState.io.emit("countdownUpdate", 0);
        countdownState.io.emit("Pot", { amount: 0 });
    });

    // ✅ Handle Reconnection: Request the latest pot again
    primarySocket.on("connect", () => {
        console.log("✅ Reconnected to Primary Server, requesting latest pot...");
        primarySocket.emit("requestPot");
    });
}
  let vite;
  if (IS_PRODUCTION) {
    app.use(express.static(path.resolve(__dirname, './dist/client/'), { index: false }));
  } else {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
      build: {
        ssr: true,
        ssrEmitAssets: true,
      }
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

  const startCountdown = () => {
    if (countdownState.interval || !isPRIMARY) return;

    countdownState.interval = setInterval(async () => {
      if (countdownState.countdown > 0) {
        countdownState.countdown--;
      } else {
        clearInterval(countdownState.interval);
        countdownState.interval = null;

        if (!countdownState.interval) {
          countdownState.countdown = 60;
          startCountdown();
        }
      }

      const result = await fetchPotAmount();

      if (result && result.data?.potAmount !== undefined) {
        const potAmount = result.data.potAmount;
        countdownState.latestPot = { amount: potAmount }; 

        // ✅ Send `Pot` update to all clients & slaves
        countdownState.io.emit("Pot", { amount: potAmount });

        countdownState.slaves.forEach(slave => {
          slave.emit("Pot", { amount: potAmount });
        });

        console.log("✅ Primary broadcasting Pot:", potAmount);
      } else {
        console.error("❌ Invalid response from fetchPotAmount:", result);
      }

      countdownState.io.emit("countdownUpdate", countdownState.countdown);
      countdownState.slaves.forEach(slave => slave.emit("countdownUpdate", countdownState.countdown));
    }, 1000);
  };

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} on port ${process.env.PORT}`);

    if (isPRIMARY) {
      countdownState.slaves.add(socket);
      socket.emit('countdownUpdate', countdownState.countdown);

      // ✅ Send latest `Pot` to new connections
      socket.on("requestPot", async () => {
        if (countdownState.latestPot) {
          socket.emit("Pot", countdownState.latestPot);
          console.log(`✅ Sent latest Pot to ${socket.id}:`, countdownState.latestPot);
        }
      });
    } else {
      socket.emit("countdownUpdate", countdownState.countdown);

      if (countdownState.latestPot) {
        socket.emit("Pot", countdownState.latestPot);
        console.log(`✅ Slave sending Pot to ${socket.id}:`, countdownState.latestPot);
      }
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
