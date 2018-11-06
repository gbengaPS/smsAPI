const express = require('express');
const { UserController, MessageController } = require('./controllers');
const validation = require('./lib/routeValidation');
const { sendValidationError, checkUserExists } = require('./middleware');

const router = express.Router();

router.post('/users', validation.createUser, sendValidationError, UserController.create);
router.post(
  '/users/:senderId/message',
  validation.createMessage,
  sendValidationError,
  checkUserExists,
  MessageController.sendMessage,
);
module.exports = router;
