var io = require('../server').socketServer;
var redis = require('redis');
const config = require('../config/config');
const promisify = require('util').promisify

var redisClient = redis.createClient({host: config.redisHost, port: config.redisPort});

var get = promisify(redisClient.get).bind(redisClient);
var set = promisify(redisClient.set).bind(redisClient);

redisClient.on('ready', () => console.log(`Redis Server is working on <${config.redisHost}>, using port : <${config.redisPort}>`))

io.on('connect_error', error => console.log(error))

io.on('connection',async socket => {
   await set(socket.id, JSON.stringify(socket.user))
})


io.on('message', async socket => {
    console.log(socket.id);
    console.log(await get(socket.id))
})
