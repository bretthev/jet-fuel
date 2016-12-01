const Url = require('../models/Urls');
const express = require('express');
const router = express.Router();
const crc = require('crc');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.urls = []

router.get('/', (request, response) => {
  response.send( {urls: app.locals.urls})
})

router.get('/:shortUrl', (request, response) => {
  let targetUrl = app.locals.urls.filter((url) => url.shortUrl===request.params.shortUrl)[0]

  if (!targetUrl) { response.send(`Please go away to somewhere that exists and never come back here.`)}
  ++targetUrl.counter
  response.redirect( targetUrl.longUrl )
})



router.post('/', (request, response) => {
  const longUrl = request.body.url;
  if (app.locals.urls.filter((url) => longUrl===url.longUrl)[0]) { response.status(201).send('That URL already exists.') }
  const dateString = Date.now().toString()
  const urlId = crc.crc24(dateString).toString(16)
  const shortUrl = crc.crc24(longUrl).toString(16)

  app.locals.urls.push({id: urlId, title: request.body.title, longUrl: longUrl, shortUrl: shortUrl, counter: 0, dateAdded: new Date().toDateString(), unix: Date.now() })
  response.status(201).send('Post received')
})






module.exports = router
