'use strict';

angular.module('video2browserApp')
  .controller('LoginCtrl', function ($scope, $log, Websocket, User, $state) {
    $scope.authenticate = function(){
        $log.info($scope.user);
           Websocket.emit("login", $scope.user, function(result){
               if (result.status === 'error'){
                   console.log(result.data);
               }
               else{
                   User.setIdentity(result.data);
                   User.setAuthentication(true);
                   $state.go('home');

               }
           });
    }
    Websocket.on('contacts list', function(data){
        $log.info('rebo llista de contacts!');
        $log.info(data);

        User.handleContacts(data.contacts);
        });
  });
