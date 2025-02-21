import { WebSocketServer } from 'ws';
const PORT = process.env.PORT || 5100;

const wss = new WebSocketServer({
    port: PORT,
    clientTracking: true
});


wss.on('connection', (ws) => {
    console.log('New client connected');

    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);

        wss.clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

