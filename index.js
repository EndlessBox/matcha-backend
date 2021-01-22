const server = require('./server');
const sockets = require('./subscribers/reactors/index');
const configuration = require('./config/config');


server.create(configuration);
server.start();

