const request = require('supertest');
const app = require('../../app');
const { users, messages } = require('../models');

global.request = request(app);
beforeAll(() => {
  users.destroy({ cascade: true, truncate: true }).then(() => {
    messages.destroy({ cascade: true, truncate: true }).then(() => true);
  });
});
