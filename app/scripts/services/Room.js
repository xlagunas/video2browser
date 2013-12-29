'use strict';

angular.module('video2browserApp')
  .service('Room', function Room($log, $state, $rootScope) {
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
            'setRoom' : function(newRoom){angular.copy(newRoom,room);},
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
//            'setPeers' : function(room){
//
//            },
            'handleMessage': function(msg){
                switch (msg.method){
                    case "CALL_CREATE":
                        this.setRoom(msg.content);
                        this.goToRoom();
                        break;
                    case "CALL_INVITE":
                        this.setRoom(msg.content);
                        this.goToRoom();
                        break;
//                    case "CALL_JOIN":
//                         this.setPeers(msg.content);
//                        break;
                    default:
                        $log.info("Entra al default del handleMessage");
                        break;
                }
            }
        }
    });
