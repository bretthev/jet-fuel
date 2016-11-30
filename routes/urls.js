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

router.post('/shortenUrl', (request, response) => {
  const longUrl = request.body.url;
  const shortUrl = crc.crc24(longUrl).toString(16)
  app.locals.urls.push({id: request.body.id, title: request.body.title, longUrl: longUrl, shortUrl: shortUrl })
  console.log(app.locals.urls)
  response.status(201).send({ url })
})






module.exports = router
