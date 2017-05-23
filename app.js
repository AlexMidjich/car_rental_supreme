const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const url = 'mongodb://alexmidjich:password123@ds029381.mlab.com:29381/carrentalsupreme'

app.use(bodyParser.urlencoded({
  extended: false
}));

MongoClient.connect(url, (error, database) => {
  if(error) return console.log(error);
  console.log('Succes!!!');
  database.collection('cars').find({}).toArray((error, result) => {
    console.log(result);
  });
});
