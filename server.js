import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { Controller } from 'unifi-client';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

const unifiController = new Controller({
  host: process.env.UNIFI_CONTROLLER_IP,
  port: 8443,
  username: process.env.UNIFI_USERNAME,
  password: process.env.UNIFI_PASSWORD,
  site: 'default',
  ssl: { rejectUnauthorized: false },
});

// ... rest of the server code remains the same

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});