const request = require('supertest');
const app = require('../src/app');

describe('GET /ping', function() {
  it('should return json with the api version', function(done) {
    request(app)
      .get('/ping')
      .expect('Content-Type', /json/)
      .expect(200, {message: 'restful api v1.0.0'}, done);
  });
});
