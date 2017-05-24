const md5 = require('md5');
const mongo = require('./mongo');

module.exports = function(app){
	app.get('/registrera', (req, res) => {
		res.render('registrera');
	});
	
	app.post('/registrera', (req, res) =>{
		console.log(req.body);
	});
}