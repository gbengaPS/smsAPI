const { users, messages } = require('../../models');
const { sendInternalServerError } = require('../../lib/utils');

class UserController {
  static create(req, res) {
    users
      .create(req.body)
      .then(user => res.status(201).send({ message: 'User created successfully', user }))
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).send({ error: 'Phone number already exists' });
        }
        return sendInternalServerError(res);
      });
  }

  static delete(req, res) {
    const { id } = req.params;
    users
      .findOne({
        where: { id },
      })
      .then((user) => {
        if (user) {
          const { phoneNumber } = user;
          users
            .destroy({
              where: { id },
            })
            .then(() => {
              messages
                .destroy({
                  where: { $or: [{ sender: phoneNumber }, { receiver: phoneNumber }] },
                })
                .then(() => {
                  res.status(200).send({ message: 'User deleted successfully' });
                })
                .catch(() => sendInternalServerError(res));
            })
            .catch(() => sendInternalServerError(res));
        } else {
          res.status(404).send({ error: 'User does not exist' });
        }
      })
      .catch(() => sendInternalServerError(res));
  }
}

module.exports = UserController;
