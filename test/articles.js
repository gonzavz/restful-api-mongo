const request = require('supertest');
const server = require('../server');
const User = require('../src/models/User');
const Article = require('../src/models/Article');
const logger = require('../src/utils/logger');

const TestUser = {
  name: 'Test User',
  avatar: 'http://test.com/test.png',
};

const noUserAndTitleBody = {
  text: 'This is a great article about nodeJS',
  tags: ['nodeJs'],
};

const tagsNoArrayBody = {
  title: 'Somthing about nodeJs',
  text: 'This is a great article about nodeJS',
  tags: 'nodeJs',
};

const articleNoUser = {
  title: 'Somthing about nodeJs',
  text: 'This is a great article about nodeJS',
  tags: ['nodeJs', 'javascript'],  
}

const removedUserBody = {
  // Note: for practical reasons we put a valid Random objectId.
  user: '507f191e810c19729de860ea',
  title: 'Somthing about nodeJs',
  text: 'This is a great article about nodeJS',
  tags: ['nodeJs', 'javascript'],
};

const validHeaders = {
 'Authorization': process.env.AUTHORIZATION_TOKEN,
};

describe('Articles Service', () => {
  before((done) => {
    logger.info('Dropping database');
    Promise.all([
      Article.remove({}).exec(),
      User.remove({}).exec(),
    ]).then(() => {
      logger.info('Database Successfully dropped.');
      const testUser = new User(TestUser);
      logger.info('Creating Test User');
      testUser.save()
        .then((createdUser) => {
          logger.info('Test User created!');
          done();
        })
        .catch((error) => {
          logger.error('Cannot create TestUser', error);
          done(error);
        });
    })
    .catch((error) => {
      logger.error('Cannot Drop database', error);
      done(error);
    });
  });

  describe('POST /articles', () => {
    it('Should Return 400 on missing user or title', (done) => {
      request(server)
        .post('/articles')
        .send(noUserAndTitleBody)
        .set(validHeaders)
        .expect('Content-Type', /json/)
        .expect(400, done);
    });
    it('Should Return 400 if tags is not an array', (done) => {
      User.findOne({name: TestUser.name}).exec()
        .then((testUser) => {
          request(server)
            .post('/articles')
            .send(Object.assign({}, tagsNoArrayBody, {user: testUser._id}))
            .set(validHeaders)
            .expect('Content-Type', /json/)
            .expect(400, done);
        })
        .catch(done);
    });
    it('Should Return 422 if user does not exist', (done) => {
        request(server)
          .post('/articles')
          .send(removedUserBody)
          .set(validHeaders)
          .expect('Content-Type', /json/)
          .expect(422, done);
    });
    it('Should Return 200 after creating a new Article', (done) => {
       User.findOne({name: TestUser.name}).exec()
        .then((testUser) => {
          request(server)
            .post('/articles')
            .send(Object.assign({}, articleNoUser, {user: testUser._id}))
            .set(validHeaders)
            .expect('Content-Type', /json/)
            .expect(200, done);
        })
        .catch(done);
    });
  });
});
