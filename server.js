const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dbName = 'jetFuelDB';
const connectionString = 'mongodb://localhost:27017/' + dbName;

mongoose.connect(connectionString);


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

app.get('/api/urls', (request, response) => {
  response.send({ urls: app.locals.urls })
})

app.post('/api/urls', (request, response) => {
  console.log(request.body, request.params)
  const id = Date.now();
  const { url } = request.body;
  url.id = url.id || Date.now()
  app.locals.urls.push(url)
  response.status(201).send({ url })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running  on ${app.get('port')}.`);
});
