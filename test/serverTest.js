const request = require('supertest');
const assert = require('assert');
const app = require('../server');

describe('GET /urls', () => {

  beforeEach(() => {
    app.locals.urls = [{
      title: "Google",
      shortUrl: 'google',
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
      .expect(201)
      .end(() => {
        assert.deepEqual(app.locals.urls, [{
          title: "Google",
          shortUrl: 'google',
          unix: 5,
          longUrl: "http://www.google.com",
          counter: 2
        }])
        done();
      })
      console.log(app.locals.urls)
  });

  xit('should get the urls in app.locals.urls', (done) => {
    const url = app.locals.urls[0]
    console.log(url)

    request(app)
      .get('/urls/google')
      .expect(200, { url }, done);
  });

});
