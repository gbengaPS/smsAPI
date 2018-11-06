const { users } = require('../models');

const user = { name: 'gbenga', phoneNumber: '08099223457' };
const secondUser = { name: 'Washington', phoneNumber: '911' };
const message = { receiver: '911', message: 'hello world' };
describe('Create message', () => {
  beforeAll(() => users.create(user).then(() => {
    users.create(secondUser);
  }));
  it('should send error when payload is not properly formatted', (done) => {
    request
      .post('/api/v1/users/1/message')
      .send()
      .end((err, res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.error.message).toBe('message field is required');
        expect(res.body.error.receiver).toBe('receiver field is required');
        done();
      });
  });

  it('should send error when sender id is not found', (done) => {
    request
      .post('/api/v1/users/5/message')
      .send(message)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Sender not found');
        done();
      });
  });

  it('should send error when sender and receiver have the same number', (done) => {
    request
      .post('/api/v1/users/2/message')
      .send(message)
      .end((err, res) => {
        expect(res.statusCode).toBe(409);
        expect(res.body.error).toBe('Sender and receiver cannot be the same user');
        expect(res.body.status).toBe('failed');
        done();
      });
  });

  it('should send error when sender and receiver have the same number', (done) => {
    const messagePayload = { receiver: '900', message: 'hello world' };
    request
      .post('/api/v1/users/2/message')
      .send(messagePayload)
      .end((err, res) => {
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Receiver not found');
        expect(res.body.status).toBe('failed');
        done();
      });
  });

  it('should create message when no errors are found', (done) => {
    request
      .post('/api/v1/users/1/message')
      .send(message)
      .end((err, res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body.status).toBe('success');
        expect(res.body.message.message).toBe(message.message);
        done();
      });
  });
});
