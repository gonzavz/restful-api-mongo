const request = require('supertest');
const server = require('../server');
const User = require('../src/models/User');
const logger = require('../src/utils/logger');

const validUser = {
  name: 'Valid User',
  avatar: 'http://someurl.com/image.png',
};

const validHeaders = {
  'Authorization': process.env.AUTHORIZATION_TOKEN,
};

const invalidHeaders = {
  'Authorization': 'NOT_A_VALID_TOKEN',
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
  });
});
