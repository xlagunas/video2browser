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
            message.type = "file";

            download(message.data, message.file.name);

            //chunkify(message);


        });

        var chunkSize = 1000000;

        function chunkify(data){
            var send = {};
            send.type = "file";
            send.data = data.data;
            send.file = data.file.name;

            if (send.data.length < chunkSize){
                send.complete = true;
            }
            else{
                send.complete = false;
                send.data = send.data.slice(0, chunkSize);

            }
            Room.getPeers()[0].dataChannel.send(JSON.stringify(send));
            data.data = data.data.slice(chunkSize);

            if (data.data.length){
                setTimeout(function(){chunkify(data);}, 500);
            }
        }

        function download(data, filename){
            var a = document.createElement("a");
            a.download = filename;
            a.href = data;
            a.target ="_blank";

            var event = document.createEvent('Event');
            event.initEvent('click', true,true);
            a.dispatchEvent(event);
            (window.URL || window.webkitURL).revokeObjectURL(a.href);

        }
  });
