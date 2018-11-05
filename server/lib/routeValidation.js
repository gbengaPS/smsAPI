const { body } = require('express-validator/check');

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
};
