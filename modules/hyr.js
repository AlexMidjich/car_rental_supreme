const mongo = require('./mongo');

module.exports = function(app){
	app.get('/hyr', (req, res) => {
		res.render('hyr');
});

app.post('/hyr', (req, res) => {
console.log(req.body)
});

}
