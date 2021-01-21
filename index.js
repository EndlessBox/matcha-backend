const server = require('./server');
const sockets = require('./subscribers/index');
const configuration = require('./config/config');


/*
 *  Test's
 */

// const UserModle = require('./models/user');

// var userModel = new UserModle();

// userModel.updateUser({userName: "toz"}, 0);


server.create(configuration);
server.start();

