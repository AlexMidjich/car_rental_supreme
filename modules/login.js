const md5 = require('md5');
const mongo = require('./mongo');

function checkUser(email, password){
	console.log(password);
	mongo.db.collection('users').find({"email" : email}).toArray((error, result) => {
		if(result[0].password === password){
			console.log("login sucessfull!");
		}else{
			console.log("login failed!");
		}
	});
}

module.exports = function(app){
	app.get('/login', (req, res) => {
		res.render('login');
	});
	
	app.post('/login', (req, res) =>{
		console.log(req.body);
		checkUser(req.body.email, md5(req.body.password));
		res.redirect("http://google.com");
	});
}