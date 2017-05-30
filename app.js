const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('express-session');
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({secret: "ag84wr68g14ar8gu", resave: false, saveUninitialized: true, cookie: {secure: false}}));

//load routes
const login = require('./modules/login')(app);
const registrera = require('./modules/registrera')(app);
const hyr = require('./modules/hyr')(app);
const bekrafta = require('./modules/bekrafta')(app);
const tack = require('./modules/tack')(app);
const edit = require('./modules/edit')(app);

app.use('/public', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(port);
