const mongo = require('./mongo');
const mdb = require('mongodb');

module.exports = function(app){
	app.get('/bekrafta', (req, res) => {
		res.render('bekrafta', {"data": req.query}); //När sidan bekrafta laddas så hämtas datan som ska användas via urlen.
});

app.post('/bekrafta', (req, res) => {

//Hämtar användar data och kollar av ifall session_id stämmer överens med användarens session_id, är det en match så bokas bilen.
	mongo.db.collection('users').findOne({email: req.session.user.email}, function(error, userResult){
		console.log(userResult);
		if(userResult.session_id == req.session.user.session_id)
		{
		//Uppdaterar databsen med värden för den bokade bilen, värden är bokningsstart, bokningsstop och användarens epost.
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
