const server = require('./server')();
const configuration = require('./config/config');

server.create(configuration);
server.start();
