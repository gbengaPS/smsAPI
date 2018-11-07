const request = require('supertest');
const app = require('../../app');

global.request = request(app);
