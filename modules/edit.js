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

function addList(res, obj){
	if(obj.brand === '' || obj.price == 0 || obj.seats === '' || obj.gear === '' || obj.rails === '' || obj.tow === '')
		res.render('edit', {err : 'Fyll i alla fält!'});
	else{
		mongo.db.collection('cars').insertOne(obj, (error, result) => {
			if(error)
				res.render('edit', {err : 'kunde inte lägga till bil.'});
			else
				res.render('edit', {err : 'Bil tilllagd.'});
		});
	}
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
		console.log(req.body);
		checkAdmin(req, function(error){
			if(error){
				console.log(error);
				res.redirect('/');
			}else{
				addList(res, req.body);
			}
		});
	});
	
	app.patch('/edit', (req, res) =>{
		
	});
	
	app.delete('/edit', (req, res) =>{
		console.log('delete called');
		console.log(req.query.id);
		checkAdmin(req, function(error){
			mongo.db.collection('cars').remove({_id: new mdb.ObjectId(req.query.id)}, (error, result) => {
				if(error){
					console.log('delete failed');
					res.json({success : "Fail", status : 400});
				}else{
					console.log('delete done');
					res.json({success : "Success", status : 200});
				}
			});
		});
		
	});
}