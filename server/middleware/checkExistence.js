const { users } = require('../models');

exports.checkUserExists = (req, res, next) => {
  const { senderId } = req.params;
  const { receiver } = req.body;
  users.findOne({ where: { id: senderId } }).then((user) => {
    if (user) {
      const sender = user.phoneNumber;
      if (sender === receiver) {
        res
          .status(409)
          .send({ error: 'Sender and receiver cannot be the same user', status: 'failed' });
      } else {
        users.findOne({ where: { phoneNumber: receiver } }).then((receiverDetails) => {
          if (receiverDetails) {
            req.body.sender = sender;
            next();
          } else {
            res.status(404).send({ error: 'Receiver not found', status: 'failed' });
          }
        });
      }
    } else {
      res.status(404).send({ error: 'Sender not found', status: 'failed' });
    }
  });
};

exports.checkUserId = (req, res, next) => {
  const { id } = req.params;
  if (!Number(id)) {
    res.status(400).send({ error: 'Expects a numeric value for id' });
  } else {
    users.findOne({ where: { id } }).then((user) => {
      if (!user) {
        res.status(404).send({ error: 'User not found' });
      } else {
        req.user = user;
        next();
      }
    });
  }
};
