const md5 = require('md5');
const mongo = require('./mongo');
const mdb = require('mongodb');

function checkAdmin(req, callback){
	if(!req.session.user)
		callback('not logged in');
	else{
		mongo.db.collection('users').findOne({email: req.session.user.email}, function(error, result){
			if(error){
				callback(error);
			}else{
				if(result.session_id === req.session.user.session_id && result.admin == 1){
					callback();
				}else{
					callback('User session not correct or user not admin.');
				}
			}
		});
	}
}

function loadList(res){
	mongo.db.collection('cars').find({}).toArray((error, result) => {
		if(error)
			res.redirect('/');
		else{
			res.render('edit', {cars: result});
		}
	});
}

module.exports = function(app){
	app.get('/edit', (req, res) => {
		checkAdmin(req, function(error){
			if(error){
				console.log(error);
				res.redirect('/');
			}else{
				loadList(res);
			}
		});
	});
	
	app.post('/edit', (req, res) =>{
		
	});
	app.patch('/edit', (req, res) =>{
		
	});
	app.delete('/edit', (req, res) =>{
		
	});
}