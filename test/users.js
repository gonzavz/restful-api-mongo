const request = require('supertest');
const server = require('../server');
const User = require('../src/models/User');
const logger = require('../src/utils/logger');

const validUser = {
  name: 'Valid User',
  avatar: 'http://someurl.com/image.png',
};

const invalidAvatar = {
  name: 'pepe',
  avatar: 'httpp://not_an_url.com',
};

const validHeaders = {
  'Authorization': process.env.AUTHORIZATION_TOKEN,
};

const invalidHeaders = {
  'Authorization': 'NOT_A_VALID_TOKEN',
};

// POST /users expect { name: required, avatar: optional}
const invalidBodyNoName = {
  'avatar': 'pepe',
};

logger.info(validHeaders);
describe('User Service', () => {
  beforeEach((done) => {
    logger.info('Droping database data.');
    User.remove({}).exec()
      .then(() => {
        logger.info('users collection succesfully droped');
        done();
      })
      .catch((error) => {
        logger.error(`error during users collection drop process: ${error}`);
        done(error);
      });
  });

  describe('POST /users', () => {
    it('Should fail if token is not valid', (done) => {
      request(server)
        .post('/users')
        .send(validUser)
        .set(invalidHeaders)
        .expect('Content-Type', /json/)
        .expect(401, done);
    });
    it('Should not allow an invalid body', (done) => {
      request(server)
        .post('/users')
        .send(invalidBodyNoName)
        .set(validHeaders)
        .expect(400, done);
    });
    it('Should validate avatar is a valid url', (done) => {
      request(server)
        .post('/users')
        .send(invalidAvatar)
        .set(validHeaders)
        .expect(422, done);
    });
    it('Should create a new User', (done) => {
      request(server)
        .post('/users')
        .send(validUser)
        .set(validHeaders)
        .expect(200, done);
    });
  });
});
