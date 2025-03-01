const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files from the "src" folder
app.use(express.static(path.join(__dirname, 'src')));

// Define a route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function to start the subscriber server on the next available port
const startSubscriber = (port) => {
    server.listen(port, () => {
        console.log(`Subscriber is running on http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            // kung ung port is in use, gamitin yung next port na available
            startSubscriber(port + 1);
        } else {
            console.error('Failed to start subscriber:', err);
        }
    });
};

// Start the first subscriber on port 3001
startSubscriber(3001);