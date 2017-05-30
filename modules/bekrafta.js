const mongo = require('./mongo');
const mdb = require('mongodb');

module.exports = function(app){
	app.get('/bekrafta', (req, res) => {
		console.log(req.query.id);
		console.log(req.query.start);
		console.log(req.query.stop);
		res.render('bekrafta', {"data": req.query}); //När sidan bekrafta laddas så hämtas datan som ska användas via urlen.
});

/*app.post('/bekrafta', (req, res) =>{
  console.log(req.body.id);
  var item = {$push: {'bokningar': {
    bokningsstart: req.body.start,
    bokningsstop: req.body.stop}
  }};
  console.log(item);
  /*mongo.db.collection('cars').patchOne(item)
  console.log(item);*/
  /*res.render('bekrafta', {"data": req.body});
});*/


app.post('/bekrafta', (req, res) => {

	mongo.db.collection('users').findOne({email: req.session.user.email}, function(error, userResult){
		console.log(userResult);
		if(userResult.session_id == req.session.user.session_id)
		{
			mongo.db.collection('cars').update(  {_id : new mdb.ObjectId(req.body.id)} , { $push: {
				"bokningar": {
					bokningsstart : req.body.start,
					bokningsstop : req.body.stop,
					user : req.session.user.email
				}
			}
			}, function (error, result) {
				if(error) {
					console.log(error);
				} else {
					console.log(req.body.start);
					console.log("Bokningen bekräftad");
					res.redirect('/tack');
				}
			});
		}else
			res.redirect('/hyr');
	});

});


};
