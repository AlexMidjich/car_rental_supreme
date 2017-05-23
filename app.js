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
  database.collection('cars').find({}).toArray((error, result) => {
    console.log("Märke: " + result[1].brand);
    console.log("Växellåda: " + result[1].gear);
    console.log("Takräcke: " + result[1].rails);
    console.log("Sitsar: " + result[1].seats);
    console.log("Dragkrok: " + result[1].tow);
    console.log("Pris/dag: " + result[1].price);
  });
});
