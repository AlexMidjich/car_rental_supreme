const mongo = require('./mongo');

//Renderar hyr sidan
module.exports = function(app){
	app.get('/hyr', (req, res) => {

//Kollar ifall användare är inloggad eller ej, är man ej inloggad skickas man till index, är man inloggad skickas man till hyr.
		if(!req.session.user)
			res.redirect('/');
		else
			res.render('hyr');
	});

/*När användaren fyllt i data från input fälten i hyr.pug och tryckt på "skicka"knappen så startar app.post.
scriptet kollar mot databasen, om det finns värden i de olika objekten så kommer objekten att visas.*/
	app.post('/hyr', (req, res) => {
		console.log(req.body)
		if(!req.session.user)
			res.redirect('/');
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
			//console.log("length", result.length);
			//Lagarar data i variablen sorted
			var sorted = [];
			for(i=0; i<result.length; i++){
				//console.log(result[i]);
				//Gör om datumen till millisekunder
				var firstDate_ms = Date.parse(req.body.bokningsstart);
				var secondDate_ms = Date.parse(req.body.bokningsstop);
				if(result[i].bokningar){
					//Loopar igenom alla bokningar som finns för att senare kunna kolla av dem mot datum som du vill boka.
					for(m=0; m<result[i].bokningar.length; m++) {
						var startDate = Date.parse(result[i].bokningar[m].bokningsstart);
						var stopDate = Date.parse(result[i].bokningar[m].bokningsstop);
						//Kollar ifall datumen som du vill boka inom inte finns på någon bil.
						//Finns datumen på en bil visas inte den.
						if(firstDate_ms >= startDate && firstDate_ms <= stopDate)
							break;
						if(secondDate_ms >= startDate && secondDate_ms <= stopDate)
							break;
						if(startDate >= firstDate_ms && startDate <= secondDate_ms)
							break;
						if(stopDate >= firstDate_ms && stopDate <= secondDate_ms)
							break;
				//Sorted uppdateras med resultaten beroende på hur if-satsen har reagerat.
						sorted.push(result[i]);
					}
				}else {
					sorted.push(result[i]);
				}
				result[i].bokningsstart = req.body.bokningsstart;
				result[i].bokningsstop = req.body.bokningsstop;
			}
			//All data har lagrats i sorted och skickas vidare till sidan hyr.pug.
			res.render('hyr', { "results" :sorted });
		});
	});
}
