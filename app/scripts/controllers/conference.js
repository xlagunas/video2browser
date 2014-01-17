'use strict';

angular.module('video2browserApp')
  .controller('ConferenceCtrl', function ($scope, $log, Room, $rootScope, $stateParams, Websocket, $modal, User, $sce){
        $scope.room             = Room.getRoom();
        $scope.localStream      = Room.getLocalStream();
        $scope.remoteStreams    = Room.getRemoteStreams();
        $scope.inviteUser;

        $scope.peers = Room.getPeers;

        $scope.sendIt = function(){
            $log.info($scope.rcv);
            $log.info(Room.getPeers());
            Room.getPeers()[0].dataChannel.send("hola");
            $log.info("Hauria d'haver enviat");
//            Root.getPeers()[0].dataChannel.send("hola");
        }
        $scope.size = {width: 640/$scope.remoteStreams.length, height: 480/$scope.remoteStreams.length }

        $scope.getPeerContact = function(username){
//            $log.info("requesting contact info: "+username);
            return User.getContactByUsername(username);
        }
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


        $scope.joinRoom = function(){
            var joinMsg = {};
            joinMsg.header      = "CALL";
            joinMsg.method      = "CALL_JOIN"
            joinMsg.content     = {};
            joinMsg.content.id  = Room.getRoom().id;
            Websocket.send(joinMsg);
        };

        Room.initMedia();

        $scope.$on("drop_user", function(event, message){
            $log.info("detecto el drop");
            $modal.open({
                'templateUrl': 'views/modalInvite.html',
                'controller' : 'ModalInviteCtrl',
                'resolve' : {
                    'username': function() {return message}
                }
            })
        });

        $scope.$on("file_send", function(event, message){
            $log.info("Rebo event file_send");
            $log.info(message);
//          var a = document.createElement("a");
//          a.download = message.file.name;
//          a.href = message.data.result;
//          $log.info(a);
//          a.click();
            var data = {};
            data.type = "file";
            data.message = message.data.slice(0, 1000);

            Room.getPeers()[0].dataChannel.send(JSON.stringify(data));
//            Room.getPeers()[0].dataChannel.send(JSON.stringify(message.data.result));

        })
  });
