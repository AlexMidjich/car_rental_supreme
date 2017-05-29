const mongo = require('./mongo');

//Renderar hyr sidan
module.exports = function(app){
	app.get('/hyr', (req, res) => {
		res.render('hyr');
});

/*När användaren fyllt i data från input fälten i hyr.pug och tryckt på "skicka"knappen så startar app.post.
scriptet kollar mot databasen, om det finns värden i de olika objekten så kommer objekten att visas.*/
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
  if(req.body.bokningsstart === '')
    search.bokningsstart = req.body.bokningsstart;
  if(req.body.bokningsstop === '')
    search.bokningsstop = req.body.bokningsstop;


  console.log(search);

  mongo.db.collection('cars').find(search).toArray((error, result) => {
		console.log("length", result.length);
    for(i=0; i<result.length; i++){
      console.log(result[i]);
      result[i].bokningsstart = req.body.bokningsstart;
      result[i].bokningsstop = req.body.bokningsstop;
    }
    res.render('hyr', { "results" :result });
  });
});
/*app.patch('/hyr', (req, res) =>{
  var item = {
    bokningsstart: req.body.bokningsstart,
    bokningsstop: req.body.bokningsstop
  };
  mongo.db.collection('cars').patchOne(item)
  console.log(item);
});*/
}
