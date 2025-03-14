import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';

const IS_PRODUCTION = process.env.ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*', // ✅ Allow all clients
    }
  });

  let vite;

  if (IS_PRODUCTION) {
    app.use(express.static(path.resolve(__dirname, './dist/client/')));
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
        render = import('./dist/server/server-entry.js').then(mod => mod.render);
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

  // ✅ Countdown logic
  let countdown = 60; // Start at 60 seconds

  const startCountdown = () => {
    setInterval(() => {
      countdown--;

      if (countdown < 0) {
        countdown = 60; // Reset countdown
      }

      console.log(`⏳ Sending countdown update: ${countdown}`);
      io.emit('countdown', countdown); // ✅ Broadcast countdown
    }, 1000);
  };

  io.on('connection', (socket) => {
    console.log('✅ New client connected:', socket.id);

    // Send the current countdown when a new client connects
    socket.emit('countdown', countdown);

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  // ✅ Start countdown on server start
  startCountdown();

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

createCustomServer();
console.log('✅ Server initialization started');
console.log('✅ Environment:', process.env.ENV);
console.log('✅ Current directory:', __dirname);
console.log('✅ IS_PRODUCTION:', IS_PRODUCTION);