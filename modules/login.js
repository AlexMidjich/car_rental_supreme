const md5 = require('md5');
const mongo = require('./mongo');
const mdb = require('mongodb');

function checkUser(email, password, req, res){
	console.log(password);
	//look for user
	mongo.db.collection('users').find({"email" : email}).toArray((error, result) => {
		if(result[0].password === password){
			var new_id = md5((new Date).getTime().toString() + email);
			mongo.db.collection('users').update(  {_id : new mdb.ObjectId(result[0]._id)} , { $set: {session_id: new_id}}, function (error, result2) {
				if(error) {
					res.render('login', {'err': 'Fel, försök igen'});
					console.log(error);
				} else {
					req.session.user = {email: email, session_id: new_id};
					res.redirect('/hyr');
				}
			});
		}else{
			res.render('login', {'err': 'Fel, försök igen'});
		}
	});
}

module.exports = function(app){
	app.get('/login', (req, res) => {
		if(req.session.user)
			res.redirect('/hyr');
		else
			res.render('login');
	});
	
	app.post('/login', (req, res) =>{
		checkUser(req.body.email, md5(req.body.password), req, res);
	});
}