var mongoose = require('mongoose');
var random = require('mongoose-simple-random');

// Word Schema
var WordSchema = mongoose.Schema({
	word: {
		type: String,
		index: true
	},
	origin: {
		type: String
	},
	description: {
		type: String
	},
	category: {
		type: String
	},
	author: {
		type: String
	}
});


// this works fine
var Word = module.exports = mongoose.model('Word', WordSchema);

module.exports.createWord = function(newWord, callback){
	newWord.save(callback);
};

module.exports.getAllWords = function(){
	Word.find();
};
 
/*
// this doesnt work at all
module.exports.getRandomWord = function(cb){
	Test.findOneRandom(function(err, result){

	});	

	return Test;
};


/*
//Random Word Schema - for testing mongoose-simple-random 
var RwSchema = mongoose.Schema({
	word: {
		type: String,
		index: true
	},
	origin: {
		type: String
	},
	description: {
		type: String
	}
});

RwSchema.plugin(random);

Test = mongoose.model('Test', RwSchema);

/**Test.findOneRandom(function(err, result) {
	if(!err) {
		console.log(result); // 1 elem
	}
});
**

// this doesnt work at all
module.exports.getRandomWord = function(cb){
	Test.findOneRandom(function(err, result){

	});	

	return Test;
};




/**
RandomSchema.statics.random = function(callback) {
 	 this.count(function(err, count) {
 	   if (err) {
 	     return callback(err);
  	  }
  	  var rand = Math.floor(Math.random() * count);
  	  this.findOne().skip(rand).exec(callback);
 	 }.bind(this));
};

RandomSchema.methods.next = function(cb) {
  var model = this.model("Random");
  model.findOne().where('_id').gt(this._id).exec(function(err, quote) {
    if (err) throw err;

    if (quote) {
      cb(null, quote);
    } else {
      // If quote is null, we've wrapped around.
      model.findOne(cb);
    }
  });
};


module.exports.getUserByUsername = function(username, callback) {
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}


module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if(err) throw err;
		callback(null, isMatch); 
	})
}
**/
