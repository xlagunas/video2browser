'use strict';

angular.module('video2browserApp')
  .controller('ConferenceCtrl', function ($scope, $log, Room, $sce, $rootScope, $stateParams, Websocket, $modal){
        $scope.room             = Room.getRoom();
        $scope.localStream      = Room.getLocalStream();
        $scope.remoteStreams    = Room.getRemoteStreams();
        $scope.inviteUser;
        $scope.peers = Room.getPeers;
        $scope.close = function(){
            console.log("Cleaning up!");
            Room.closePeerConnections();
        }

        $scope.invite = function(){
            console.log($scope.inviteUser);
            var msg2 = {};
            msg2.header         = 'CALL';
            msg2.method         = 'CALL_INVITE'
            msg2.content        = Room.getRoom();
            msg2.content.users  = [];
            msg2.content.users.push($scope.inviteUser);
            console.log("payload al sortir: "+JSON.stringify(msg2.payload));
            Websocket.send(msg2);
        }

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.joinRoom = function(){
            var joinMsg = {};
            joinMsg.header      = "CALL";
            joinMsg.method      = "CALL_JOIN"
            joinMsg.content     = {};
            joinMsg.content.id  = Room.getRoom().id;
            Websocket.send(joinMsg);
        };

        Room.initMedia();

        $rootScope.$on("drop_user", function(event, message){
            $modal.open({
                'templateUrl': 'views/modalInvite.html',
                'controller' : 'ModalInviteCtrl',
                'resolve' : {
                    'username': function() {return message}
                }
            })
        });
  });
