import fs from 'node:fs';
import path from 'node:path';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { Server } from 'socket.io';
import { io as client_io } from 'socket.io-client';

const PRIMARY = 3000;
const isPRIMARY = process.env.PORT == PRIMARY;

const IS_PRODUCTION = process.env.ENV === 'production';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const countdownState = {
  countdown: 60,
  interval: null,
  io: [],
  slaves: []
};

const startCountdown = () => {
  if (countdownState.interval || !isPRIMARY) return;

  countdownState.interval = setInterval( async () => {
    if (countdownState.countdown > 0) {
      countdownState.countdown--;
    } else {
      clearInterval(countdownState.interval);
      countdownState.interval = null;
      countdownState.countdown = 60;
      startCountdown();
    }

    countdownState.io.forEach(io => io.emit("countdownUpdate", countdownState.countdown));
    countdownState.slaves.forEach(slave => slave.emit("countdownUpdate", countdownState.countdown));

  }, 1000);
};


async function createCustomServer() {
  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: '*', 
      methods: ['GET', 'POST'],
    }
  });

  countdownState.io.push(io);
  let primarySocket;

  if (!isPRIMARY) {
    primarySocket = client_io(`http://localhost:${PRIMARY}`);

    primarySocket.on("countdownUpdate", (countdown) => {
      countdownState.countdown = countdown;
      countdownState.io.forEach(io => io.emit("countdownUpdate", countdown));
    });
    console.log(`Slave instance connected to Master at ${PRIMARY}`);
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

  
  // let countdown = 60; 

  // const startCountdown = () => {
  //   setInterval(() => {
  //     countdown--;

  //     if (countdown < 0) {
  //       countdown = 60; 
  //     }

      
  //     io.emit('countdown', countdown); 
  //   }, 1000);
  // };

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id} on port ${process.env.PORT}`);
    console.log('✅ New client connected:', socket.id);

    // Send the current countdown when a new client connects
    if (isPRIMARY) {
            countdownState.slaves.push(socket);
            socket.emit('countdownUpdate', countdownState.countdown);
    
            // socket.on("placeBet", (betData) => {
            //     placeBet(socket, betData); 
            // });
    
        } else {
            socket.emit("countdownUpdate", countdownState.countdown);
    
    //         socket.on("placeBet", (betData) => {
    //             console.log(`Forwarding placeBet from ${process.env.PORT} to Master`);
    //             if (masterSocket) {
    //                 masterSocket.emit("placeBet", betData);
    //             }
    //         });
    
    //         masterSocket.on("betResponse", (response) => {
    //             socket.emit("betResponse", response);
    //         });
    
    //         masterSocket.on("bettingHistoryUpdate", (data) => {
    //             socket.emit("bettingHistoryUpdate", data);
    //         });
    
    //         masterSocket.on("jackpotUpdate", (data) => {
    //             socket.emit("jackpotUpdate", data);
    //         });
        }
    });
    if (isPRIMARY && !countdownState.interval) {
      startCountdown();
    }
  
    console.log(`Server running on port ${process.env.PORT}`);
    server.listen(process.env.PORT);
  }
  
createCustomServer();
console.log('✅ Server initialization started');
console.log('✅ Environment:', process.env.ENV);
console.log('✅ Current directory:', __dirname);
console.log('✅ IS_PRODUCTION:', IS_PRODUCTION);