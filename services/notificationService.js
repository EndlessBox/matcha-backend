var NotificationModel = require("../models/notification");
var userService = require('./userService');

module.exports = class notificationService {
  constructor() {}

  createNotificationPayload(type, notifier, notified, dateOfNotification) {
    let userServ = new userService();
    return {
      type: type,
      notifier: userServ.cleanUserResponse(notifier),
      notified: userServ.cleanUserResponse(notified),
      date: dateOfNotification,
    };
  }

  createNotificationDbPayload(
    type,
    notifierId,
    notifiedId,
    seen,
    dateOfNotification
  ) {
    return {
      id: null,
      type: type,
      notifier: notifierId,
      notified: notifiedId,
      date: dateOfNotification,
      seen: seen,
    };
  }

  async getUserWaitingNotifications(type, userId) {
    try {

        let notificationModel = new NotificationModel();

        let result = await notificationModel.getUserNotSeenNotifications(type, userId);

        return(result);
    } catch (err) {
      throw err;
    }
  }

  async updateNotificationSeen(notificationId) {
    try {

        let notificationModel = new NotificationModel();

        let result = await notificationModel.updateNotificationAttribute('seen', 1, notificationId);

        return(result);
    } catch (err) {
      throw err;
    }
  }
  
};
