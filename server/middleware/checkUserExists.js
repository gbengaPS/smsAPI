const { users } = require('../models');

const checkUserExists = (req, res, next) => {
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

module.exports = checkUserExists;
