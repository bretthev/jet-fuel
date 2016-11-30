const Url = require('../models/Urls');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.urls = []

router.get('/', (request, response) => {
  response.send( {urls: app.locals.urls})
})

router.post('/', (request, response) => {
  app.locals.urls.push({id: Date.now(), title: request.body.title, url: request.body.url})
  response.status(201).send({ url })
})






module.exports = router
