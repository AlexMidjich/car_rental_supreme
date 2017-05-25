const mongo = require('./mongo');

module.exports = function(app){
	app.get('/hyr', (req, res) => {
		res.render('hyr');
});

app.post('/hyr', (req, res) => {
  console.log(req.body)
  var search = {};
  if(req.body.seats !== '')
    search.seats = req.body.seats;
  if(req.body.gear !== '')
    search.gear = req.body.gear;
  if(req.body.rails !== '')
    search.rails = req.body.rails;
  if(req.body.tow !== '')
    search.tow = req.body.tow;

  console.log(search);

  mongo.db.collection('cars').find(search).toArray((error, result) => {
    for(i=0; i<result.length; i++)
      console.log(result[i]);
      res.render('hyr', {'results':result});
  });
});
}
