var MessageModel = require("../models/message");

module.exports = class messageService {
  constructor() {}

  getuserlastMessages(payload, user) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(user);
        let messageModel = new MessageModel();

        let result = await messageModel.getUserLastMessages(
          user.id,
          payload.userId,
          payload.offset,
          payload.row_count
        );
        // console.og(result);

        result = result.map(async (element) => {
          if (element.seen == 0 && element.receiver === user.id) {
            await messageModel.updateMessageByAttribute("seen", 1, element.id);
            return { ...element, seen: 1 };
          }
          return element;
        });

        resolve(Promise.all(result));
      } catch (error) {
        reject(error);
      }
    });
  }
};
