const express = require('express');
const socket = require('socket.io');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 4000;

const url = 'mongodb://alexmidjich:password123@ds029381.mlab.com:29381/carrentalsupreme'

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/public', express.static('public'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index');
});

MongoClient.connect(url, (error, database) => {
  if(error) return console.log(error);
  database.collection('cars').find({}).toArray((error, result) => {
    //document.querySelector('#marke').innerHTML = + result[1].brand;
    console.log("Växellåda: " + result[1].gear);
    console.log("Takräcke: " + result[1].rails);
    console.log("Sitsar: " + result[1].seats);
    console.log("Dragkrok: " + result[1].tow);
    console.log("Pris/dag: " + result[1].price);
  });
});

server.listen(port);
