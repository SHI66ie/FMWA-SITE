const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to log all requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Serve static files from multiple directories
app.use(express.static(__dirname));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('Index file not found');
    }
});

// Handle 404
app.use((req, res) => {
    res.status(404).send('404 - Not Found');});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
console.log('Attempting to start server...');
console.log('Current directory:', __dirname);
console.log('Index.html exists:', fs.existsSync(path.join(__dirname, 'index.html')));

const server = app.listen(PORT, () => {
    const host = 'localhost';
    console.log(`Server running at http://${host}:${PORT}`);
    console.log('Serving files from:', __dirname);
    
    // Log network interfaces for remote access
    const os = require('os');
    const ifaces = os.networkInterfaces();
    
    console.log('Network interfaces:');
    Object.keys(ifaces).forEach(ifname => {
        ifaces[ifname].forEach(iface => {
            if ('IPv4' === iface.family && !iface.internal) {
                console.log(`- http://${iface.address}:${PORT}`);
            }
        });
    });
});

// Handle server events
server.on('listening', () => {
    console.log('Server is now listening on port', PORT);
});

server.on('error', (error) => {
    console.error('Server error:', error);
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Please stop any other servers using this port.`);
    } else {
        console.error('Server error:', error);
    }
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});
