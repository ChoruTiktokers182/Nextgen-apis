const express = require('express');
const http = require('http');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', createProxyMiddleware({ target: 'http://158.101.198.227:8643/', changeOrigin: true }));

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to check server uptime
const checkServerUptime = async () => {
  try {
    const response = await axios.get('http://158.101.198.227:8643/');
    if (response.status === 200) {
      console.log('Server is up and running');
    } else {
      console.log('Server is down');
    }
  } catch (error) {
    console.log('Error checking server uptime:', error.message);
  }
};

// Check server uptime every 10 seconds
setInterval(checkServerUptime, 10000);
