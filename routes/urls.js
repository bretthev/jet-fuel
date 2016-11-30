const Url = require('../models/Urls');
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.urls = [{
  title: 'google',
  url: 'www.google.com'
}]

router.get('/', (request, response) => {
  response.send( app.locals.urls )
})






module.exports = router
