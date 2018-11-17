const request = require('supertest');
const app = require('../../app');
const db = require('../models');

global.request = request(app);

afterAll(() => db.sequelize.close());
