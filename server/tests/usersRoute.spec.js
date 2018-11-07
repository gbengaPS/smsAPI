const { user } = require('../lib/constants');
const { clearDatabase } = require('../lib/utils');

describe('Users', () => {
  beforeAll(done => clearDatabase().then(() => {
    done();
  }));
  afterAll(done => clearDatabase().then(() => {
    done();
  }));
  describe('Create User', () => {
    it('should fail if name or phone number field is empty', (done) => {
      request
        .post('/api/v1/users')
        .send()
        .end((error, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.name).toBe('name field is required');
          expect(res.body.error.phoneNumber).toBe('phoneNumber field is required');
          done();
        });
    });

    it('should fail if phone number is invalid', (done) => {
      request
        .post('/api/v1/users')
        .send({ name: 'gbenga', phoneNumber: '3333o333' })
        .end((error, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.phoneNumber).toBe('Invalid phone number supplied');
          done();
        });
    });

    it('should create user if payload is properly formatted', (done) => {
      request
        .post('/api/v1/users')
        .send(user)
        .end((error, res) => {
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('User created successfully');
          done();
        });
    });

    it('should send error if phone number already exists', (done) => {
      request
        .post('/api/v1/users')
        .send(user)
        .end((error, res) => {
          expect(res.statusCode).toBe(409);
          expect(res.body.error).toBe('Phone number already exists');
          done();
        });
    });
  });

  describe('Delete user', () => {
    it('should send error message when id is not numeric', (done) => {
      request
        .delete('/api/v1/users/o')
        .send()
        .end((error, res) => {
          expect(res.statusCode).toBe(400);
          expect(res.body.error.id).toBe('Expects a numeric value for id');
          done();
        });
    });

    it('should send error when user id is not found', (done) => {
      request
        .delete('/api/v1/users/10')
        .send()
        .end((error, res) => {
          expect(res.statusCode).toBe(404);
          expect(res.body.error).toBe('User does not exist');
          done();
        });
    });

    it('should delete user when user is found', (done) => {
      request
        .delete('/api/v1/users/1')
        .send()
        .end((error, res) => {
          expect(res.statusCode).toBe(200);
          expect(res.body.message).toBe('User deleted successfully');
          done();
        });
    });
  });
});
