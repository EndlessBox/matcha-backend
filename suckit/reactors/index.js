var io = require("../../server").socketServer;
const config = require("../../config/config");
var cacheService = new (require("../../services/cacheService"))();
var notificationService = require("../../services/notificationService");
var userService = require("../../services/userService");
var matchService = require("../../services/matchService");
var cacheClient = cacheService.createCacheClient();
var UserModel = require("../../models/user");
var LikeModel = require("../../models/like");
var MessageModel = require("../../models/message");
var emmitor = require("../emmitors/index");

cacheClient.on("ready", () =>
  console.log(
    `Redis Server is working on <${config.redisHost}>, using port : <${config.redisPort}>`
  )
);

cacheClient.on("error", function (err) {
  console.log("Redis error: " + err);
});

io.on("connect_error", (error) => console.log(error));

io.on("connection", async (socket) => {
  try {
    let notificationServ = new notificationService();
    let userModel = new UserModel();
    let likeModel = new LikeModel();
    let messageModel = new MessageModel();
    let userServ = new userService();

    await cacheService.setNewCacheEntry(socket.user.id, socket.id);

    var unseenNotification = await notificationServ.getUserWaitingNotifications(
      "notified",
      socket.user.id
    );

    var unseenMessages = await messageModel.getUserWaitingMessages(
      "receiver",
      socket.user.id
    );

    var resultsNotification = [];
    var resultsMessages = [];

    /*
     *  Manage unseen notifications.
     */
    if (unseenNotification.length) {
      resultsNotification = unseenNotification.map(async (notification) => {
        notification.notified = userServ.cleanUserResponse(socket.user);
        notification.notifier = await userModel.getUserByAttribute(
          "id",
          notification.notifier
        );

        notification.notifier = userServ.cleanUserResponse(
          notification.notifier
        );

        await notificationServ.updateNotificationSeen(notification.id);

        delete notification.seen;
        return notification;
      });
      emmitor(
        "notification",
        await Promise.all(resultsNotification),
        socket.id
      );
    }

    /*
     *  Manage Unseen messages.
     */
    if (unseenMessages.length) {
      resultsMessages = unseenMessages.map(async (message) => {
        message.receiver = userServ.cleanUserResponse(socket.user);
        message.sender = await userModel.getUserByAttribute(
          "id",
          message.sender
        );
        message.sender = userServ.cleanUserResponse(message.sender);
        await messageModel.updateMessageByAttribute("seen", 1, message.id);

        delete message.seen;
        return message;
      });

      emmitor("message", await Promise.all(resultsMessages), socket.id);
    }

    socket.on("message", async (payload) => {
      console.log('message0')
      let sender = socket.user;


      if (!payload.to || !payload.message)
        return emmitor("error", "Bad request.", socket.id)
      let receiver = await userModel.getUserByAttribute("userName", payload.to);
      console.log('message2')

      if ((await likeModel.checkUsersConnection(sender.id, receiver.id)) !== 2)
        return emmitor(
          "error",
          "Sender and Receiver are not connected",
          socket.id
        );

      let receiverSockerId = await cacheService.getUserSocketId(receiver.id);

      let date = new Date();

      await messageModel.createMessge({
        id: null,
        sender: sender.id,
        receiver: receiver.id,
        content: payload.message,
        date: date,
        seen: receiverSockerId ? 1 : 0,
      });

      if (receiverSockerId)
        emmitor(
          "message",
          [{ from: sender.userName, message: payload.message, date: date }],
          receiverSockerId
        );
    });


    socket.on("checkConnectedUser", async (id) => {
      let socketId = await cacheService.getUserSocketId(id);

      
      let user = await userModel.getUserByAttribute('id', id);

      if (!user)
        return emmitor("error", "user not found.", socket.id);

      if (!socketId)
        emmitor("responseConnectedUser", notificationServ.createCheckConnectionResponsePayload(id, false, user.lastSeen), socket.id);
      else
        emmitor("responseConnectedUser", notificationServ.createCheckConnectionResponsePayload(id, true, null), socket.id);

    })

    socket.on("disconnect", async () => {
      await userModel.updateUserAttribute("lastSeen", new Date(), socket.user.id);
      await cacheService.deleteCacheEntry(socket.user.id);
    });
  } catch (error) {
    console.error("Error", error);
    emmitor("error", error, socket.id);
  }
});
