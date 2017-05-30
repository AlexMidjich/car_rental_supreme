

module.exports = function(app){
	app.get('/login', (req, res) => {
		res.render('login');
	});
	
	app.post('/login', (req, res) =>{
		console.log(req.body);
		checkUser(req.body.email, md5(req.body.password), req, res);
	});
}