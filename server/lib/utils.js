const { internalErrorMessage } = require('./constants');
const { users, messages } = require('../models');

exports.sendInternalServerError = (res) => {
  res.status(500).send({ error: internalErrorMessage });
};

exports.clearDatabase = async () => {
  await users.destroy({ truncate: true, restartIdentity: true });
  await messages.destroy({ truncate: true, restartIdentity: true });
};
