const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const setupWebSocketServer = require('./setupWebSocketServer');

// Initialize Express routes and middleware

setupWebSocketServer(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
