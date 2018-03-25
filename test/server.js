const request = require('supertest');
const app = require('../src/app');

describe('GET /', function() {
  it('should return json with the api version', function(done) {
    request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, {message: 'restful api v1.0.0'}, done);
  });
});
