var NotificationModel = require("../models/notification");

module.exports = class notificationService {
  constructor() {}

  createNotificationPayload(type, notifier, notified, dateOfNotification) {
    return {
      type: type,
      notifier: { id: notifier.id, userName: notifier.userName },
      notified: { id: notified.id, userName: notified.userName },
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

        return(result.map(element => {
            delete element.id;
            delete element.seen;
        }));
    } catch (err) {
      throw err;
    }
  }
};
