const { users } = require('../models');
const { user, secondUser, message } = require('../lib/constants');
const { clearDatabase } = require('../lib/utils');

describe('Message', () => {
  beforeAll(async () => {
    await clearDatabase();
    await users.create(user);
    await users.create(secondUser);
  });

  afterAll(async () => {
    await clearDatabase();
  });
  describe('Create Message', () => {
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

    it('should send error when receiver does not exist', (done) => {
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

  describe('getMessages', () => {
    it('should send error when id no a number', (done) => {
      request
        .get('/api/v1/users/o/messages/sent')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error).toBe('Expects a numeric value for id');
          done();
        });
    });

    it('should send error when user does not exist', (done) => {
      request
        .get('/api/v1/users/10/messages/sent')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.error).toBe('User not found');
          done();
        });
    });

    it('should return 404 when user has no sent messages', (done) => {
      request
        .get('/api/v1/users/2/messages/sent')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(404);

          expect(res.body.message).toBe('User does not have any messages sent');
          done();
        });
    });

    it('should return 404 when user has no received messages', (done) => {
      request
        .get('/api/v1/users/1/messages/received')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(404);

          expect(res.body.message).toBe('User has not received any messages');
          done();
        });
    });

    it('should return sent messages when available', (done) => {
      request
        .get('/api/v1/users/1/messages/sent')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.messages.length).toBeGreaterThan(0);
          done();
        });
    });

    it('should return received messages when available', (done) => {
      request
        .get('/api/v1/users/2/messages/received')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.messages.length).toBeGreaterThan(0);
          done();
        });
    });
  });

  describe('deleteMessage', () => {
    it('should send error message when id is not a number', (done) => {
      request
        .delete('/api/v1/messages/e')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.id).toBe('Expects a numeric value for id');
          done();
        });
    });

    it('should return error when message is not found', (done) => {
      request
        .delete('/api/v1/messages/5')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.error).toBe('Message not found');
          done();
        });
    });
    it('should delete message when no error are found', (done) => {
      request
        .delete('/api/v1/messages/1')
        .send()
        .end((err, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('Message deleted successfully');
          done();
        });
    });
  });
});
