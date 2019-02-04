// DEPENDENCIES
const express = require('express');

const server = express();

// MIDDLEWARE
const configureMiddleware = require('./config/middleware');

configureMiddleware(server);

// ROUTES
const exampleRoutes = require('./routes/exampleRoutes');

server.use('/api/example', exampleRoutes);

module.exports = server;
