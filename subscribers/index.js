const config = require('../config/config');


module.exports = (httpServer) => {
    var io = require('socket.io')(httpServer, {
        cors: {
            origin: "*"
        }
    });


    io.on('connect_failed', error => console.log(error))


    io.on('connection', socket => {
        socket.emit('announcemewnts', {message:'Hello a hamadi'});
    })
}






// socket.on('connect', () => {
//     socket.send('Hello');
// })


// socket.on('like', (payload) => {
//     console.log(payload)
// })
