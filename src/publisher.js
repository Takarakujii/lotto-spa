const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Enable CORS for WebSocket connections
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (for development only)
    },
});

app.use(express.static(path.join(__dirname, 'src')));

// Define a route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Countdown logic
let countdown = 60; 

// Function to start the countdown
const startCountdown = () => {
    setInterval(() => {
        if (countdown > 0) {
            countdown--;
        } else {
            countdown = 60; // Reset to 60 seconds
        }
        io.emit('countdown', countdown); // io.emit means ibobroadcast nya sa lahat ng subscribers
    }, 1000); // Update every second
};

// Socket.io connection handler
io.on('connection', (socket) => {
    console.log('A subscriber connected:', socket.id);

    // Send the current countdown value to the newly connected subscriber
    socket.emit('countdown', countdown);

    // Handle subscriber disconnect
    socket.on('disconnect', () => {
        console.log('A subscriber disconnected:', socket.id);
    });
});

// Start the countdown when the server starts
startCountdown();

// Start the publisher server
const PORT = 3000; // Publisher runs on port 3000
server.listen(PORT, () => {
    console.log(`Publisher is running on http://localhost:${PORT}`);
});