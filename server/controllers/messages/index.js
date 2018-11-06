const { messages } = require('../../models');

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
}

module.exports = MessageController;
