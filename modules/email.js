const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'car.rental.supreme@gmail.com',
		pass: 'carpassword'
	}
});

let mailOptionActivation = {
	from: 'Car Rental Supreme',
	to: '',
	subject: 'Aktiveringsl�nk.',
	text: '',
	html: ''
};

module.exports = function sendActivation(data){
	
	mailOptionActivation.to = data.email;
	mailOptionActivation.text = 'Hej ' + data.fname + '. G� till denna l�nk f�r att aktivera dit konto: localhost:4000/registrera/aktivera?activationId=' + data.active_id;
	mailOptionActivation.html = '<h3> Hej' + data.fname + '.<h3><br><a href="localhost:4000/registrera/aktivera?activationId=' + data.active_id + '">Tryck h�r f�r att aktivera dit konto</a>'
	
	transporter.sendMail(mailOptionActivation, (error, info) =>{
		if (error) {
			return console.log(error);
		}
		console.log('Message %s sent: %s');
	});
}