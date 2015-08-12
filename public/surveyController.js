angular.module('survey',[])
.controller('SurveyController', function($scope, $http) {
  $scope.questions = [];

  $http.get('http://localhost:3001/questions/')
  .success(function(data, status, headers,config) {
    $scope.questions = data;
  })

  var survey = $scope.questions;

  $scope.createSurvey = function(survey) {
    $http.post('http://localhost:3001/surveys', survey)
    .success(function(data, status, headers,config) {
      //$scope.questions = data;
      console.log("maybe something happened")
    })
  }

  //results page
  $scope.surveys = {};
  $scope.men = 0;

  $http.get('http://localhost:3001/surveys')
  .success(function(data, status, headers,config) {
    $scope.surveys = data;
    console.log(data.filter(function(x) {
      x.answers.Male === true;
    }).length);
  })
})
