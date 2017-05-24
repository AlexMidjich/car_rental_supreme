const mongo = require('./mongo');

module.exports = function(app){
	app.get('/hyr', (req, res) => {
		res.render('hyr');
	});
}
/* this code should be in public/js
const myBtn = document.getElementById('hyrbtn');

myBtn.addEventListener('click', function(event){
  console.log('hurray!');
});
*/