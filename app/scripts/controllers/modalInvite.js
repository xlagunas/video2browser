'use strict';

angular.module('video2browserApp')
  .controller('ModalInviteCtrl', function ($scope, $modalInstance, $log, username, Room, User, Websocket) {
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
        msg.receiver        = $scope.contact.username
        $log.debug(msg);
        Websocket.send(msg);
//        $modalInstance.close($scope.contact);
        $modalInstance.close();

//        $modal.open({
//            'templateUrl': 'views/modalWaiting.html',
//            'controller' : 'ModalCallerCtrl'
//        })


//            .result.then(
//            function(cb){
//                return function(returnValue){
//                    $log.info("__asdasdas");
//                    $log.info(returnValue);
//                    $log.info("asdasdas__");
//                    var msg = {};
//                    msg.header = "CALL";
//                    msg.method = "CALL_ACCEPT";
//                    msg.content = cb.getRoom();
//                    msg.receiver = returnValue.username;
//                    $rootScope.$broadcast("send_WS", msg);
//
//                    cb.goToRoom();
//                }
//            }(this), function(){
//                $log.info("cancelled call");
//            }
//        );
    }

    $scope.cancel = function(){
        $log.debug("Surto de la funcio amb un error");
        $modalInstance.dismiss('cancel');
    }
  });
