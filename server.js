const express = require('express')
const bodyParser = require('body-parser');
// const mongoose = require('mongoose')
// const MongoClient = require('mongodb').MongoClient
const urls = require('./routes/urls')

const app = express()

// const dbName = 'jetFuelDB';
// const connectionString = 'mongodb://localhost:27017/' + dbName;

// mongoose.connect(connectionString);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/urls', urls);
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Jet Fuel';


app.listen(app.get('port'), () => {
  console.log(`VROOOOOOOM ${app.locals.title} is running  on ${app.get('port')}.`);
});

module.exports = app;
