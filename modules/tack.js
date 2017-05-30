const mongo = require('./mongo');
const mdb = require('mongodb');

//Scriptet hämtar sidan "tack" så att den kan laddas
module.exports = function(app){
	app.get('/tack', (req, res) => {
		res.render('tack');
  });
};
