const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://alexmidjich:password123@ds029381.mlab.com:29381/carrentalsupreme'

MongoClient.connect(url, (error, database) => {
  if(error) return console.log(error);
  console.log("Database connected!")
  module.exports.db = database;
});
