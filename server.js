const express = require('express');
const errorHandler = require('./services/errorService');


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

            server.use(express.json())
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