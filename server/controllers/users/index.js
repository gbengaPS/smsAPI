const db = require('../../models');

const { users } = db;
class UserController {
  static create(req, res) {
    users
      .create(req.body)
      .then(user => res.status(201).send({ message: 'User created successfully', user }))
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          return res.status(409).send({ error: 'Phone number already exists' });
        }
        return res
          .status(500)
          .send({ error: 'Your request has made our server behave in an unusual way' });
      });
  }
}

module.exports = UserController;
