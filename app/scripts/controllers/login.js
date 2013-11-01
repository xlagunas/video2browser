'use strict';

angular.module('video2browserApp')
  .controller('LoginCtrl', function ($scope, $log, $http) {
    $http.defaults.use
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.submit = function(person){
        $log.info(person);
        $http({'method': 'POST', 'url': 'http://localhost:8080/v2b/users/create', 'data': JSON.stringify(person)}).
            success(function(data, status, headers, config) {
                $log.debug("entra al success" +status)
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $log.debug("entra al error "+status)
            });
    }
  });
