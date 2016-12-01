const request = require('supertest');
const app = require('./server');

describe('GET /urls', () => {

  beforeEach(() => {
    app.locals.urls = [{
      title: "Google",
      unix: 5,
      longUrl: "http://www.google.com",
      counter: 2
    }];
  });

  afterEach(() => {
    app.locals.urls = [];
  });

  it('should get the urls in app.locals.urls', (done) => {
    request(app)
      .get('/urls')
      .expect({ urls: app.locals.urls }, done);
  });
});
