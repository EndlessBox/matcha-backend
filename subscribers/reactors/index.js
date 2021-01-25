var io = require("../../server").socketServer;
const config = require("../../config/config");
var cacheService = new (require("../../services/cacheService"))();
var notificationService = require("../../services/notificationService");
var cacheClient = cacheService.createCacheClient();
var UserModel = require("../../models/user");
var emmitor = require("../emmitors/index");
const userService = require("../../services/userService");

cacheClient.on("ready", () =>
  console.log(
    `Redis Server is working on <${config.redisHost}>, using port : <${config.redisPort}>`
  )
);

io.on("connect_error", (error) => console.log(error));

io.on("connection", async (socket) => {
  let notificationServ = new notificationService();
  let userModel = new UserModel();
  let userServ = new userService();

  await cacheService.setNewCacheEntry(socket.user.id, socket.id);

  var unseenNotification = await notificationServ.getUserWaitingNotifications(
    "notified",
    socket.user.id
  );
  var results = [];

  if (unseenNotification.length) {
    results = unseenNotification.map(async (notification) => {

      
      notification.notified = userServ.cleanUserResponse(socket.user);
      notification.notifier = await userModel.getUserByAttribute(
        "id",
        notification.notifier
        );
        
        
      notification.notifier = userServ.cleanUserResponse(notification.notifier);
        
      
      await notificationServ.updateNotificationSeen(notification.id);

      delete notification.seen;
      return notification;
    });

    emmitor("notification", await Promise.all(results), socket.id);
  }

  socket.on("disconnect", async () => {
    await cacheService.deleteCacheEntry(socket.user.id);
  });
});
