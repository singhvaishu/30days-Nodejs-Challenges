const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.get('/websocket', (req, res) => {
    res.sendFile(__dirname + '/websocket.html');
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });


function setupWebSocket() {

    wss.on('connection', (ws) => {
        console.log('Client connected');

        ws.on('message', (message) => {
            console.log('Received:', message);

            ws.send(message);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });


        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
}

setupWebSocket();


const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
