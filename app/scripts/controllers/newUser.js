'use strict';

angular.module('video2browserApp')
  .controller('NewUserCtrl', function ($scope, $log, $http, $state, User) {
    $scope.newUser = User.identity;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.submit = function(person){
        $log.info(person);
        if ($scope.passConfirmation === person.password){
            $http({'method': 'PUT', 'url': '../users/create', 'data': JSON.stringify(person)}).
                success(function(data, status, headers, config) {
                    $log.debug("entra al success" +status)
                    $state.go("addPhoto");
                    // this callback will be called asynchronously
                    // when the response is available
                }).
                error(function(data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    $log.debug("entra al error "+status)
                    if (status === 400){
                        $log.debug("errorType: "+data.errorType+"\nerrorDesc: "+data.description);
                    }
                });
        }

    }
    $scope.checkUsernameAvailable = function(){
        $log.info("checking availability " +$scope.newUser.username);
        $http({'method':'POST', 'url': '../users/register', 'data': $scope.newUser.username})
            .success(function(data){
                $scope.availability = data;
                $log.info("Request response: "+$scope.availability);
            })
            .error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                $log.debug("entra al error "+status)
                if (status === 400){
                    $log.debug("errorType: "+data.errorType+"\nerrorDesc: "+data.description);
                }
            });
    }
  });
