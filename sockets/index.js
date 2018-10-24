const TrapModel = require('../trap/trap.model');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('room_join', (room) => {
      socket.join(room);
    });

    socket.on('receiveHistory', (trapId) => {
      TrapModel
        .find({ trap_id: trapId })
        .sort([['created_at', 'descending']])
        .lean()
        .exec((err, results) => {
          if (err) console.error(err);

          socket.emit('history', results);
        });
    });
  });
};
