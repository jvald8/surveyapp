angular.module('survey',[])
.controller('SurveyController', function($scope, $http) {
  $scope.questions = [];

  $http.get('http://localhost:3001/questions/')
  .success(function(data, status, headers,config) {
    $scope.questions = data;
  })

  var surveyToPost = {

  };

  /*$scope.createSurvey = $http.post('http://localhost:3001/surveys', surveyToPost)
  .success(function(data, status, headers,config) {
    $scope.questions = data;
  })*/
})
