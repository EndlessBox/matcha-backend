const emitEvent = (eventName, payload, socketId) => {
  var io = require("../../server").socketServer;

  io.to(socketId).emit(eventName, [payload]);
};

module.exports = emitEvent;
