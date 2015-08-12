var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
questions = require('./questions.js');

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/questions', questions.getAllQuestions);
app.post('/questions', questions.addQuestion);
app.put('/questions/:id', questions.updateQuestion);
app.delete('/questions/:id', questions.deleteQuestion);

app.get('/surveys', questions.getAllSurveys);
app.post('/surveys', questions.addSurvey);

app.listen(process.env.PORT || 3001, function() {
  console.log('server started on 3001')
})
