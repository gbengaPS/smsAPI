const express = require('express');
const UserController = require('./controllers/users');
const validation = require('./lib/routeValidation');
const sendValidationError = require('./middleware/sendValidationError');

const router = express.Router();

router.post('/users', validation.createUser, sendValidationError, UserController.create);
module.exports = router;
