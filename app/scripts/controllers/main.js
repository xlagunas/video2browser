'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, $http, $log, User) {
//        User.setIdentity(loggedUser.data);

//        $http.post('http://localhost:8080/v2b/users/list', User.getIdentity()).then(function(response){
//            $apply(function(){
//                User.setContacts(response.data);
//                $log.info(response);
//            });
//        })

        $scope.identity = User.getIdentity();
        $scope.contacts = User.getContacts();
  });
