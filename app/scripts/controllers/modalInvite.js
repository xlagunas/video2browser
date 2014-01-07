'use strict';

angular.module('video2browserApp')
  .controller('ModalInviteCtrl', function ($scope, $modal, $modalInstance, $log, username, Room, User, Websocket) {
        $scope.contact = User.getContactByUsername(username);
        $scope.room = Room.getRoom();

        $log.debug($scope.contact);
        $log.debug($scope.room);

    $scope.invite = function(){
        $log.debug("Surto de la funcio amb un ok");
        var msg = {};
        msg.header          = "CALL"
        msg.method          = 'CALL_INVITE'
        msg.content         = $scope.room;
        //msg.content.users = [];
        //msg.content.users.push($scope.contact.username);
        msg.receiver        = $scope.contact.username
        $log.debug(msg);
        Websocket.send(msg);
        $modalInstance.close($scope.contact);
    }

    $scope.cancel = function(){
        $log.debug("Surto de la funcio amb un error");
        $modalInstance.dismiss('cancel');
    }
  });
