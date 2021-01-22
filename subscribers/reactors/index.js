var io = require('../../server').socketServer;
const config = require('../../config/config');
var cacheService = new (require('../../services/cacheService'));
var notificationService = require('../../services/notificationService');
var cacheClient = cacheService.createCacheClient();
var emmitor = require('../emmitors/index');


cacheClient.on('ready', () => console.log(`Redis Server is working on <${config.redisHost}>, using port : <${config.redisPort}>`))

io.on('connect_error', error => console.log(error))

io.on('connection',async socket => {

   let notificationServ = new notificationService();

   await cacheService.setNewCacheEntry(socket.user.id, socket.id)


   // I AM HERE ! !!!!!!!!!!!
   let unseenNotification = await notificationServ.getUserWaitingNotifications('notified', socket.user.id);
   console.log(unseenNotification)
   // emmitor('notification', )


   socket.on('disconnect', async  () => {
      await cacheService.deleteCacheEntry(socket.user.id);
   } )
})