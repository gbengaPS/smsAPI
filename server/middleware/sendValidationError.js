const { validationResult } = require('express-validator/check');

const sendValidationError = (req, res, next) => {
  const errors = validationResult(req).formatWith(error => error.msg);
  if (!errors.isEmpty()) {
    res.status(400).send({ error: errors.mapped() });
  } else {
    next();
  }
};

module.exports = sendValidationError;
