var MessageModel = require('../models/message');

module.exports = class messageService {
    constructor(){}

    getuserlastMessages(payload, user) {
        return new Promise(async (resolve, reject) => {
            try {
                let messageModel = new MessageModel();

                resolve (await messageModel.getUserLastMessages(user.id, payload.userId, payload.offset, payload.row_count));

            } catch (error) {
                reject(error);
            }
        })
    }
}