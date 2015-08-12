angular.module('survey',[])
.controller('SurveyController', function($scope, $http) {
  $scope.questions = [];

  $http.get('http://localhost:3001/questions/')
  .success(function(data, status, headers,config) {
    $scope.questions = data;
  })
})
