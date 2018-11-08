const express = require('express');
const { UserController, MessageController } = require('./controllers');
const validation = require('./lib/routeValidation');
const { sendValidationError, checkUserExists, checkUserId } = require('./middleware');

const router = express.Router();
router.get('/users/:id/messages/sent', checkUserId, MessageController.getSentMessages);
router.get('/users/:id/messages/received', checkUserId, MessageController.getReceivedMessages);

router.post('/users', validation.createUser, sendValidationError, UserController.create);
router.post(
  '/users/:senderId/message',
  validation.createMessage,
  sendValidationError,
  checkUserExists,
  MessageController.sendMessage,
);

router.delete('/users/:id', validation.idValidation, sendValidationError, UserController.delete);

router.delete(
  '/messages/:id',
  validation.idValidation,
  sendValidationError,
  MessageController.deleteMessage,
);
module.exports = router;
