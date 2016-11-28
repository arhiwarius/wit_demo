var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

mongoose.Promise = global.Promise;
//var db = mongoose.createConnection('mongodb://dbuser_wordapp:wordapp@ds159767.mlab.com:59767/test_wordapp');
mongoose.connect('mongodb://dbuser_wordapp:wordapp@ds159767.mlab.com:59767/test_wordapp');
var db = mongoose.connection;

var routes = require('./routes/index');
var users = require('./routes/users');
var wit = require('./routes/wit');

// init app
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Sessions
app.use(session({
	secret: 'secret',
	saveUninitialized: true,
	resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root 		= namespace.shift()
		, formParam	= root;

	while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	}
	return {
		param 	: formParam,
		msg		: msg,
		value	: value
	};
	}
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
});



app.use('/', routes);
app.use('/users', users);
app.use('/wit', wit);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
	console.log('Server started on port '+app.get('port'));
});