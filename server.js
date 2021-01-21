const express = require('express');
const errorHandler = require('./services/errorService');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var config = require('./config/config');
var cors = require('cors');
var socketAuth = require('./services/authenticationService')().checkAccessTokenSockets


var app = express(),
    router = require('./api'),
    server = require('http').createServer(app),
    io  = require('socket.io')(server, {
        cors: {
            origin: '*',
        }
        }),
    create,
    start,

    /*
        *  Function that setup our express server
        */
    create = function (configuration) {


        io.use(socketAuth);
        app.set('port', configuration.serverPort);
        app.set('hostname', configuration.serverHost);

        /*
            *  Debugging middleware.
            */
        app.use(morgan('tiny'));

        
        app.use(cookieParser());
        app.use(express.json());
        if (config.NODE_ENV !== 'production') {
            app.use(cors());
        }
        app.use('/api', router);
        app.use(errorHandler);
    }

    /*
    *  Function that start our express server
    */
start = function () {
    let port = app.get('port'),
        hostname = app.get('hostname');

    server.listen(port, () => {
        console.log(`server on \nhostName: ${hostname}\nport: ${port}`);
    })
}

module.exports = { create: create, start: start, socketServer: io };