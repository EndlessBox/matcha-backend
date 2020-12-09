const express = require('express');
const errorHandler = require('./services/errorService');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var config = require('./config/config');
var cors = require('cors');


module.exports = () => {
    var server = express(),
        router = require('./api'),
        create,
        start,

        /*
         *  Function that setup our express server
         */
        create = function (configuration) {

            server.set('port', configuration.serverPort);
            server.set('hostname', configuration.serverHost);

            /*
             *  Debugging middleware.
             */
            server.use(morgan('tiny'));

            
            server.use(cookieParser());
            server.use(express.json());
            if (config.nodeEnv !== 'Production')
                router.use(cors());
            server.use('/api', router);
            server.use(errorHandler);
        }

    /*
     *  Function that start our express server
     */
    start = function () {
        let port = server.get('port'),
            hostname = server.get('hostname');

        server.listen(port, () => {
            console.log(`server on \nhostName: ${hostname}\nport: ${port}`);
        })
    }
    return ({ create: create, start: start })
}