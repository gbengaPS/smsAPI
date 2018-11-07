const { messages } = require('../../models');
const { sendInternalServerError } = require('../../lib/utils');

class MessageController {
  static sendMessage(req, res) {
    const { sender, receiver, message } = req.body;
    messages
      .create({
        sender,
        receiver,
        message,
      })
      .then((sentMessage) => {
        res.status(201).send({ message: sentMessage, status: 'success' });
      })
      .catch(() => {
        res.status(500).send({ error: 'Your request made our server behave in an unusual way' });
      });
  }

  static getSentMessages(req, res) {
    const { user } = req;
    messages
      .findAll({ where: { sender: user.phoneNumber } })
      .then((userMessages) => {
        if (!userMessages.length) {
          res.status(404).send({ message: 'User does not have any messages sent' });
        } else {
          res.status(200).send({ messages: userMessages });
        }
      })
      .catch(() => {
        sendInternalServerError(res);
      });
  }

  static getReceivedMessages(req, res) {
    const { user } = req;
    messages
      .findAll({ where: { receiver: user.phoneNumber } })
      .then((userMessages) => {
        if (!userMessages.length) {
          res.status(404).send({ message: 'User has not received any messages' });
        } else {
          res.status(200).send({ messages: userMessages });
        }
      })
      .catch(() => {
        sendInternalServerError(res);
      });
  }
}

module.exports = MessageController;
