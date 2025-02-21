import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 5100 }); 

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

