var LikeModel = require("../models/like");
var UserModel = require("../models/user");
var ImageModel = require("../models/image");
var matchService = require("./matchService");
var NotificationModel = require("../models/notification");
var rankService = require("./rankService");
var cacheService = require("./cacheService");
var notificationService = require("./notificationService");
var emmitors = require("../suckit/emmitors/index");
var xpConfig = require("../config/config").Experience;

module.exports = class likeService {
  constructor() {}

  createLike(payload, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let likeModel = new LikeModel();
        let userModel = new UserModel();
        let imageModel = new ImageModel();
        let notificationModel = new NotificationModel();
        let rankServ = new rankService();
        let cacheServ = new cacheService();
        let notificationServ = new notificationService();
        let matchServ = new matchService();
        let cacheClient = cacheServ.createCacheClient();

        if (user.userName !== payload.liker)
          return reject({ message: "Like from outer source.", status: 403 });

        let liker = await userModel.getUserByAttribute(
          "userName",
          payload.liker
        );
        let liked = await userModel.getUserByAttribute(
          "userName",
          payload.liked
        );

        let likerImageCount = await imageModel.getImagesCountByAttribute(
          "userId",
          liker.id
        );

        if (!liker || !liked)
          return reject({ message: "Invalide user.", status: 403 });

        if (!likerImageCount)
          return reject({
            message: `Unauthorized, user '${liker.userName}' must upload at least one picture.`,
            status: 403,
          });

        let { result, date } = await likeModel.createLike({
          liker: liker.id,
          liked: liked.id,
        });

        let likedSocketId = await cacheServ.getUserSocketId(
          liked.id,
          cacheClient
        );

        let likerSocketId = await cacheServ.getUserSocketId(
          liker.id,
          cacheClient
        );

        if ((await likeModel.checkUsersConnection(liker.id, liked.id)) == 2) {
          if (await matchServ.createMatch({ matcher: liker.userName, matched: liked.userName },liker))
          {
            await notificationModel.createNotificattion(notificationServ.createNotificationDbPayload("match", liker.id, liked.id, likedSocketId ? 1 : 0, date));
            await notificationModel.createNotificattion(notificationServ.createNotificationDbPayload("match", liked.id, liker.id, likerSocketId ? 1 : 0, date));

            emmitors("notification", notificationServ.createNotificationPayload("match", liked, liker, date), likerSocketId);
            emmitors("notification", notificationServ.createNotificationPayload("match", liker, liked, date), likedSocketId);
            
          }
        }

        await notificationModel.createNotificattion(
          notificationServ.createNotificationDbPayload(
            "like",
            liker.id,
            liked.id,
            likedSocketId ? 1 : 0,
            date
          )
        );
        if (likedSocketId)
          emmitors(
            "notification",
            notificationServ.createNotificationPayload(
              "like",
              liker,
              liked,
              date
            ),
            likedSocketId
          );

        /*
         *  After creating like were updating the liked value with the like amout + rankValue of the liker as percentage.
         */
        let newUserExperience = await rankServ.calculateUserExperience(
          xpConfig.like,
          liked,
          liker,
          "Max"
        );
        await userModel.updateUserAttribute(
          "experience",
          newUserExperience,
          liked.id
        );

        resolve(result);
      } catch (err) {
        console.error(err);
        if (err.code === "ER_DUP_ENTRY" && err.errno == 1062) {
          console.error(
            new Date().toLocaleDateString(),
            err.sqlMessage,
            "-- UserName: " + user.userName
          );
          return resolve({ message: "Nothing changed" });
        }
        reject(err);
      }
    });
  }

  deleteLike(payload, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let userModel = new UserModel();
        let likeModel = new LikeModel();
        let notificationModel = new NotificationModel();
        let cacheServ = new cacheService();
        let rankServ = new rankService();
        let notificationServ = new notificationService();
        let matchServ = new matchService();
        let cacheClient = cacheServ.createCacheClient();

        let liker = await userModel.getUserByAttribute(
          "userName",
          payload.liker
        );
        let liked = await userModel.getUserByAttribute(
          "userName",
          payload.liked
        );
        if (!liker | !liked)
          return resolve({ message: "user not found", status: 404 });

        
        await matchServ.deleteMatch({matcher: liker.userName, matched: liked.userName}, user);

        let { date } = await likeModel.deleteLike(liker.id, liked.id);

        let likedSocketId = await cacheServ.getUserSocketId(
          liked.id,
          cacheClient
        );

        await notificationModel.createNotificattion(
          notificationServ.createNotificationDbPayload(
            "unlike",
            liker.id,
            liked.id,
            likedSocketId ? 1 : 0,
            date
          )
        );
        if (likedSocketId)
          emmitors(
            "notification",
            notificationServ.createNotificationPayload(
              "unlike",
              liker,
              liked,
              date
            ),
            likedSocketId
          );

        let newUserExperience = await rankServ.calculateUserExperience(
          xpConfig.dislike,
          liked,
          liker,
          "MIN"
        );
        await userModel.updateUserAttribute(
          "experience",
          newUserExperience,
          liked.id
        );

        resolve({ message: "user unliked succefully", status: 200 });
      } catch (err) {
        reject(err);
      }
    });
  }

  getUserLikedHistory(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let likeModel = new LikeModel();
        let results = await likeModel.getLikedHistoryByUserId(user.id);
        if (!results.length)
          return resolve({ message: "No likes found.", status: 200 });
        resolve(results);
      } catch (error) {
        reject(error);
      }
    });
  }
};
