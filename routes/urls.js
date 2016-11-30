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

  response.redirect( targetUrl.longUrl )
})

router.patch(`/:shortUrl`, (request, response) {
  let targetUrl = app.locals.urls.map((url, i) => url.id===request.params.id)
  console.log(targetUrl)
})

router.post('/', (request, response) => {
  const longUrl = request.body.url;
  const shortUrl = crc.crc24(longUrl).toString(16)
  app.locals.urls.push({id: request.body.id, title: request.body.title, longUrl: longUrl, shortUrl: shortUrl, counter: request.body.counter })
  console.log(app.locals.urls)
  response.status(201).send('Post received')
})






module.exports = router
