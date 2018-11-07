const { internalErrorMessage } = require('./constants');
const { users, messages } = require('../models');

exports.sendInternalServerError = (res) => {
  res.status(500).send({ error: internalErrorMessage });
};

exports.clearDatabase = () => users.destroy({ truncate: true, restartIdentity: true }).then(() => {
  messages.destroy({ truncate: true, restartIdentity: true }).then(() => true);
});
