const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Jet Fuel';

app.locals.urls = [{
  title: 'Google',
  id: 1,
  url: 'www.google.com'
}, {
  title: 'ESPN',
  id: 2,
  url: 'www.espn.com'
}]

app.get('/', (request, response) => {
  response.sendFile('./public/index.html')
});

app.get('/urls', (request, response) => {
  response.send({ urls: app.locals.urls })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running  on ${app.get('port')}.`);
});
