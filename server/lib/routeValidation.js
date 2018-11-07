const { body, param } = require('express-validator/check');

module.exports = {
  createUser: [
    body('name')
      .trim()
      .exists()
      .withMessage('name field is required')
      .matches(/^([a-zA-Z]+\s*)+$/)
      .withMessage('Name not properly formatted'),
    body('phoneNumber')
      .trim()
      .exists()
      .withMessage('phoneNumber field is required')
      .isMobilePhone('any')
      .withMessage('Invalid phone number supplied'),
  ],
  createMessage: [
    body('receiver')
      .exists()
      .withMessage('receiver field is required')
      .trim()
      .isMobilePhone('any')
      .withMessage('Invalid phone number supplied'),
    body('message')
      .exists()
      .withMessage('message field is required')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Message field cannot be empty'),
    param('senderId')
      .exists()
      .withMessage('senderId param is required')
      .trim()
      .isNumeric()
      .withMessage('Expects a numeric value for senderId'),
  ],
  deleteAccount: [
    param('id')
      .isNumeric()
      .withMessage('Expects a numeric value for id'),
  ],
};
