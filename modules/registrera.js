const md5 = require('md5');
const mongo = require('./mongo');

//returns object with corrected data or error with string of errors.
function checkInput(data, res){
	mongo.db.collection('users').find({"email" : data.email}).toArray((error, result) => {
		var obj = {'error'  : 0, 'errmsg' : [], 'user' : {}};
		//chek if email is in use
		if(result.length > 0){
			obj.error = 1; obj.errmsg.push('E-mail addressen används redan');
		}else if(data.email === "") {
			obj.error = 1; obj.errmsg.push('Fyll i en E-mail address');
		}
		obj.user.email = data.email;
		//check first and last name
		var format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		if(format.test(data.fname) || format.test(data.ename)){
			obj.error = 1; obj.errmsg.push('Använd inga specialtecken i namn.');
		}else{
			obj.user.fname = (data.fname.charAt(0).toUpperCase() + data.fname.slice(1).toLowerCase());
			obj.user.ename = (data.ename.charAt(0).toUpperCase() + data.ename.slice(1).toLowerCase());
		}
		//check phone number
		if(data.phone < 1000000){
			obj.error = 1; obj.errmsg.push('vänligen kontrolera mobilnummer');
		}else{
			if(data.phone.toString().charAt(0) !== '0')
				obj.user.phone = '0' + data.phone.toString();
			else
				obj.user.phone = data.phone.toString;
		}
		//check password
		if(data.password.length < 8){
			obj.error = 1; obj.errmsg.push('Lösenordet måsta vara minst 8 tecken');
		}else if(data.password !== data.password2){
			obj.error = 1; obj.errmsg.push('Lösenorden stämmer inte överens');
		}else{
			obj.user.password = md5(data.password);
		}
		console.log(obj);
		if(obj.error){
			res.render('registrera', {'err': obj.errmsg});
		}else{
			
		}
	});

}

function addUser(data){
	var res = mongo.db.collection('users').insertOne();
	
}

module.exports = function(app){
	app.get('/registrera', (req, res) => {
		res.render('registrera');
	});
	
	app.post('/registrera', (req, res) =>{
		console.log(req.body);
		checkInput(req.body, res);
	});
}