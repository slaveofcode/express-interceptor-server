'use strict';

const sock = require("socket.io");
const getLogs = require('./modules/getlogs');

const socketHandler = (app) => {
  const io = sock(app);

  io.on('connection', async (socket) => {
    console.log("connection made", socket.id);

    socket.on('fetch-message', async ({ hostName }) => {
      const logs = await getLogs(hostName);
      socket.emit('new-logs', { logs });
    });

  });

  return io;
}

module.exports = socketHandler;