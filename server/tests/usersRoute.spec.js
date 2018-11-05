describe('Create User', () => {
  const user = { name: 'gbenga', phoneNumber: '08099223456' };
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
