var mongo = require('mongodb');
var Server = mongo.Server;
var Db = mongo.Db;
var server = new Server('localhost', 27017, {auto_reconnect:true});
var db = new Db('questionsdb', server);

//configure sorting
var sortBy = 'id';
var direction = 1;

db.open(function(err, db) {
  if(!err) {
    console.log('connection to the database is a go');
    db.collection('questions', {strict:true}, function(err, collection) {
      if(err) {
        console.log('Couldn\'t find the db, let\'s create it and populate it with a question');
        populateDb();
      }
    });
  }
});

exports.getAllQuestions = function(request, response) {
  db.collection('questions', function(err, collection) {
    collection.find().sort({sortBy: direction}).toArray(function(err, docs) {
      response.setHeader('Access-Control-Allow-Origin', '*');
      response.send(docs);
    });
  });
};

exports.addQuestion = function(request, response) {

  var question = {
    id: request.body.id,
    question: request.body.question.title,
    answers: request.body.question.answers
  }

  db.collection('questions', function(err, collection) {
    if(err) {
      console.log(err)
    } else {
      collection.insert(question, {safe:true}, function(err, result) {
        if(err) {
          console.log('theres been an error adding the question: ' + err);
          response.send({'error':'theres been an error'});
        } else {
          response.setHeader('Access-Control-Allow-Origin', '*');
          response.send(result);
        }
      });
    }
  });
};

exports.updateQuestion = function(request, response) {

  var question = {
    id: parseInt(request.params.id),
    question: request.body.question.title,
    answers: request.body.question.answers
  }

  db.collection('questions', function(err, collection) {
    if(err) {
      console.log(err)
    } else {
      collection.update({id:question.id}, question, function(err, result) {
        if(err) {
          console.log('theres been an error updating the question: ' + err);
          response.send({'error':'theres been an error'});
        } else {
          response.setHeader('Access-Control-Allow-Origin', '*');
          response.send(result);
        }
      });
    }
  });
};

exports.deleteQuestion = function(request, response) {
  var id = parseInt(request.params.id);

  db.collection('questions', function(err, collection) {
    if(err) {
      console.log(err)
    } else {
      collection.remove({id:id}, function(err, result) {
        if(err) {
          console.log('theres been an error updating the question: ' + err);
          response.send({'error':'theres been an error'});
        } else {
          response.setHeader('Access-Control-Allow-Origin', '*');
          response.send(result);
        }
      });
    }
  });
};

var populateDb = function() {
  var questions = [
    {
        id:1,
        title:'mock question?',
        answers: [{'mock answer 1': true}, {'mock answer 2': false}]
    }];

    db.collection('questions', function(err, collection) {
        collection.insert(questions, {safe:true}, function(err, result) {
          if(err) {
            console.log(err)
          } else {
            console.log('successfully added mock data')
          }
        });
    });

};
