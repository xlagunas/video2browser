'use strict';

angular.module('video2browserApp')
  .controller('LoginCtrl', function ($scope, $log, $http, $state) {


$scope.submit = function(login){
    var queryString = "username="+login.username+"&password="+login.password;
    $log.info(login);
        $http({'method': 'POST', 'url': 'http://localhost:8080/v2b/login',
            'headers': {'Content-Type': 'application/x-www-form-urlencoded'},
            'data': queryString}).
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
    };

});

