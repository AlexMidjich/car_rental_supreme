const md5 = require('md5');
const mongo = require('./mongo');
const mdb = require('mongodb');

//check if current user is addmin. is called att every request. 
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

//load list of cars in database
function loadList(res){
	mongo.db.collection('cars').find({}).toArray((error, result) => {
		if(error)
			res.redirect('/');
		else{
			res.render('edit', {cars: result});
		}
	});
}

//add one car to the database
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
	//post is not an ajax call, does note reurn json, 
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
	//deleta a car using ajax.
	app.delete('/edit', (req, res) =>{
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
	
	//load view for one specific car
	app.get('/editcar', (req, res) => {
		checkAdmin(req, function(error){
			if(error){
				console.log(error);
				res.redirect('/');
			}else{
				mongo.db.collection('cars').findOne({_id : new mdb.ObjectId(req.query.id)}, function(error, result){
					if(error || !result){
						console.log(error);
						res.redirect('/edit');
					}else{
						console.log(result);
						res.render('editcar', result);
					}
				});
			}
		});
	});
	
	//update car 'ajax call'
	app.patch('/editcar', (req, res) =>{
		console.log(req.query);
		var obj = {};
		if(req.query.brand != '')
			obj.brand = req.query.brand;
		if(req.query.price != '')
			obj.price = req.query.price;
		if(req.query.rails != '')
			obj.rails = req.query.rails;
		if(req.query.seats != '')
			obj.seats = req.query.seats;
		if(req.query.gear != '')
			obj.gear = req.query.gear;
		if(req.query.tow != '')
			obj.tow = req.query.tow;
		
		checkAdmin(req, function(error){
			if(error){
				console.log(error);
				res.json({success : "Fail", status : 400});
			}else{
				mongo.db.collection('cars').update({_id : new mdb.ObjectId(req.query.id)}, {$set: obj}, function(error, result){
					if(error){
						console.log(error);
						res.json({success : "Fail", status : 400});
					}else{
						console.log('update done');
						res.json({success : "Fail", status : 200});
					}
				});
			}
		});
	});
}