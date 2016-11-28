var express = require('express');
var router = express.Router();
var Word = require('../models/addword');


router.get('/wit', function(req, res){
	res.render('wit');
});

router.get('/random', function(req, res){
	Word.getAllWords();
	console.log(Word);
	res.render('random');
});

router.get('/addword', function(req, res){
	res.render('addword');
});


// Register new User
router.post('/addword', function(req, res) {
	var word = req.body.word;
	var origin = req.body.origin;
	var description = req.body.description;
	//var author = user.username;
	//var password = req.body.password;

	// validation
	req.checkBody('word', 'name is req').notEmpty();
	req.checkBody('description', 'username is req').notEmpty();
	//req.checkBody('username', 'username is req').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('addword', {
			errors:errors
		});
	} else {
		var newWord = new Word({
			word: word,
			origin: origin,
			description: description,
			//author: author
		});

		Word.createWord(newWord, function(err, word){
			if(err) throw err;
			console.log(word);
		});

		req.flash('success_msg', 'Слово успешно добавлено!');

		res.redirect('/wit/addword');
	};
});


module.exports = router;