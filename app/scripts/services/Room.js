'use strict';

angular.module('video2browserApp')
  .service('Room', function Room($log, $state, $rootScope, $modal, $modalStack) {
        var servers = {
            "iceServers" : [
                {'url' : 'stun:stun.l.google.com:19302'},
                {'url' : 'stun:stun1.l.google.com:19302'},
                {'url' : 'stun:stun2.l.google.com:19302'},
                {'url' : 'stun:stun3.l.google.com:19302'},
                {'url' : 'stun:stun4.l.google.com:19302'}
             ]
        };

        var localStreamObject = {};
        var peerConnection = [];
        var remoteStreams = [];
//        var conferenceService = {};
        var localStream = {};
        var userConstraints = {};
        var room = {};
        var userMedia = {};

        return{
            'closePeerConnections' : function(){
                console.log("Entro al conferenceService");
                for (var i=0;i<peerConnection.length;i++){
                    peerConnection[i].close();
                }
                peerConnection = [];
                remoteStreams = [];
                localStream = [];
                localStreamObject.stop();
            },
            'getUsersConstraints' : function(){
                return userConstraints;
            },
            'setUserConstraints' : function(media){
                console.log("Entra al setUserConstraints");
                angular.copy(media, userConstraints);
            },
            'createNewPeer' : function(username, onIceCandidateCallback){
                var peer = new RTCPeerConnection(servers,
                    { optional:
                        [
                            {"DtlsSrtpKeyAgreement": true},
                            {RtpDataChannels: false}
                        ]
                    });
                peer.usernameId = username;
                peer.onicecandidate = function(event){
                    onIceCandidateCallback(event);
                };
                peer.onaddstream = function(stream){
                    window.URL = window.URL || window.webkitURL;
                    remoteStreams.push({'user': peer.usernameId, 'url': window.URL.createObjectURL(stream.stream)});
                };
                peerConnection.push(peer);
                $rootScope.$apply();

                return peer;
            },
            'getLocalStreamObject' : function(){return localStreamObject},
            'findPeerByUsername' : function(username){
                for (var i=0;i<peerConnection.length;i++){
                    if (peerConnection[i].usernameId == username){
                        return peerConnection[i];
                    }
                }
                return undefined;
            },
            'initMedia' : function(callback){
                userMedia = getUserMedia(userConstraints,
                    function(localMediaStream){
                        window.URL = window.URL || window.webkitURL;
                        localStreamObject = localMediaStream;
                        localMediaStream.url= window.URL.createObjectURL(localMediaStream);
                        angular.copy(localMediaStream, localStream);
                        callback();
                        $rootScope.$apply();
                    },
                    function(err){
                        console.log("initMedia error "+err);
                    });
            },
            'getRemoteStreams': function(){return remoteStreams;},
            'getLocalStream' : function () {return localStream;},
            'getRoom' : function() { return room; },
            'setRoom' : function(newRoom){$log.debug("Entro al setRoom");$log.debug(newRoom);angular.copy(newRoom,room);},
            'goToRoom' : function(){
                switch(room.roomType){
                    case 'VIDEO':
                        userConstraints = {'video': true, 'audio': true};
                        break;
                    case 'AUDIO' :
                        userConstraints = {'video': false, 'audio': true};
                        break;
                    default:
                        userConstraints = {'video': true, 'audio': true};
                        break;
                }
                $state.go('conference');
            },
            'handleMessage': function(msg){
                switch (msg.method){
                    case "CALL_CREATE":
                        break;
                    case "CALL_INVITE":
                        this.setRoom(msg.content);
                        $modal.open({'templateUrl':'views/modal.html', 'controller': 'ModalCalleeCtrl',
                            'resolve' : {
                                callType: function () {return msg.content.roomType},
                                sender: function(){ return msg.sender}
                            }
                        }).result.then(
                                function(cb){
                                    return function(returnValue){
                                        $log.info("__asdasdas");
                                        $log.info(returnValue);
                                        $log.info("asdasdas__");
                                        var msg = {};
                                        msg.header = "CALL";
                                        msg.method = "CALL_ACCEPT";
                                        msg.content = cb.getRoom();
                                        msg.receiver = returnValue.username;
                                        $rootScope.$broadcast("send_WS", msg);

                                        cb.goToRoom();
                                    }
                                }(this), function(){
                                    $log.info("cancelled call");
                                }
                            );
                        break;
                    case "CALL_ACCEPT":
                        $log.debug("Rebo un CALL_ACCEPT");
                        $rootScope.$broadcast("close_popup", "");
                        this.setRoom(msg.content);
                        this.goToRoom();
                        break;
                    case "CALL_REJECT":
                        $log.debug("Rebo un CALL_REJECT");
                        $rootScope.$broadcast("close_popup", "");
                        break;
                    default:
                        $log.info("Entra al default del handleMessage");
                        break;
                }
            }
        }
    });
