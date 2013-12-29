'use strict';

angular.module('video2browserApp')
  .controller('UserCtrl', function ($scope, $stateParams,$log, User, Websocket) {
     var identity = User.getIdentity();

     if ($stateParams.username == identity.username){
        $scope.user = identity;
     }
     else{
         $scope.user = User.getContactByUsername($stateParams.username);
     }

    $scope.identity = identity;

    $scope.createRoom = function(roomType){
        var msg = {};
        msg.header = 'CALL';
        msg.method = 'CALL_CREATE';
        msg.receiver = $scope.user.username;
        msg.content = {};
        msg.content.roomType = roomType;

        Websocket.send(msg);

    }

    $log.debug($stateParams);
  });
