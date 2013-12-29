'use strict';

angular.module('video2browserApp')
  .service('Websocket', function Websocket($log, User, $rootScope, Room) {
        var protocols = ['websocket', 'xdr-streaming', 'xhr-streaming', 'iframe-eventsource', 'iframe-htmlfile',
            'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling' ];
//        var protocols = ['websocket'];

        var sock = new SockJS("http://localhost:8080/v2b/socket/", undefined,  {protocols_whitelist: protocols, debug: true });

        sock.onopen = function(){console.log("obert desde angular");};

        sock.onmessage = function(e){
            console.log("message des d'angular: ",e.data);
            var msg = JSON.parse(e.data);
            $log.debug(msg);
            switch(msg.header)
            {
                case "ROSTER":
                    User.handleContacts(msg.content);
                    break;
                case "CALL_ACK":
                    if (msg.method === "CALL_JOIN"){
                        $log.info("entra al call join")
                        if(msg.content.users != null){
                            for (var i=0;i<msg.content.users.length;i++){
                                var user = msg.content.users[i];
                                $log.debug("Entra al user "+user.username);
                                Room.createNewPeer(user.username, function(username){
                                    return function(event){
                                        if (!event || !event.candidate) return;
                                        var candidate = event.candidate;
                                        var msg = {};
                                        msg.header = "WEBRTC";
                                        msg.method = "WEBRTC_ADD_ICE_CANDIDATE";
                                        msg.content = candidate;
                                        msg.receiver = username;
                                        msg.sender = User.getIdentity().username;
                                        $log.info("Sending Ice Candidate to "+msg.receiver);
//                                        $rootScope.$broadcast("WebSocketSend", msg);
//                                        this.send(msg);
                                        sock.send(JSON.stringify(msg));
                                    }
                                }(user.username));
                                Room.findPeerByUsername(user.username).addStream(Room.getLocalStreamObject());
                                Room.findPeerByUsername(user.username).createOffer(function(currentUser){
                                    return function(sessionDescription){
                                        var msg = {};
                                        msg.header = "WEBRTC";
                                        msg.method = "WEBRTC_SEND_OFFER";
                                        msg.content = sessionDescription;
                                        msg.receiver = user.username;
                                        msg.sender = User.getIdentity().username;
                                        $log.info("Sending Session Description to "+msg.receiver);
                                        sock.send(JSON.stringify(msg));
                                        Room.findPeerByUsername(user.username).setLocalDescription(sessionDescription);
                                    }
                                }(user.username), null,{'mandatory':
                                    {'OfferToReceiveAudio': Room.getUsersConstraints().audio,
                                     'OfferToReceiveVideo': Room.getUsersConstraints().video}
                                 });
                            }
                        }
                    }
                     else Room.handleMessage(msg);
                    break;
                case "WEBRTC":
                    switch(msg.method){
                        case "WEBRTC_SEND_OFFER":
                            $log.debug("Received WEBRTC Message with WEBRTC_SEND_OFFER")
                            var peer = Room.createNewPeer(msg.sender, function (event) {
                                if (!peer || !event || !event.candidate) return;
                                var candidate = event.candidate;
                                var msg = {};
                                msg.header = "WEBRTC"
                                msg.method = "WEBRTC_ADD_ICE_CANDIDATE";
                                msg.content = candidate;
                                msg.receiver = peer.usernameId;
                                msg.sender = User.getIdentity().username;
                                $log.debug("Enviant oferta a "+msg.receiver);
                                sock.send(JSON.stringify(msg));
                            });
                            peer.addStream(Room.getLocalStreamObject());
                            peer.setRemoteDescription(new RTCSessionDescription(msg.content));
                            peer.createAnswer(function (sessionDescription){
                                    var msg = {};
                                    msg.header = "WEBRTC"
                                    msg.method = "WEBRTC_SEND_ANSWER";
                                    msg.content = sessionDescription;
                                    msg.receiver = peer.usernameId;
                                    msg.sender = User.getIdentity().username;
                                    console.log("Enviant resposta a "+msg.receiver);
                                    sock.send(JSON.stringify(msg));
                                    peer.setLocalDescription(sessionDescription);
                                },
                                null,
                                {'mandatory':
                                    {'OfferToReceiveAudio':Room.getUsersConstraints().audio,
                                     'OfferToReceiveVideo': Room.getUsersConstraints().video
                                    }
                                }
                            );
                            break;
                        case "WEBRTC_SEND_ANSWER":
                            $log.debug("Received WEBRTC Message with WEBRTC_SEND_ANSWER")
                            Room.findPeerByUsername(msg.sender)
                                .setRemoteDescription(new RTCSessionDescription(msg.content));
                            break;
                        case "WEBRTC_ADD_ICE_CANDIDATE":
                            $log.debug("Received WEBRTC Message with WEBRTC_ADD_ICE_CANDIDATE")
                            Room.findPeerByUsername(msg.sender)
                                .addIceCandidate(new RTCIceCandidate(
                                    {
                                     'sdpMLineIndex': msg.content.sdpMLineIndex,
                                     'candidate': msg.content.candidate
                                    })
                                );
                            break;
                    }
                    break;
                default:
                    console.log("default");
                    break;
            }

        $rootScope.$apply();
        };

        sock.onclose = function(){
            console.log("tancat");
        };

//        window.onbeforeunload = function(e){
//            console.log("onbeforeunload");
//            sock.close();
//        };

//        $rootScope.$on("closeState", function(){
//            $log.info("Rebo el event emes");
//            sock.close();
//        })
        return {
            socket: sock,
            send: function(message){
                message.sender = User.getIdentity().username;
                sock.send(JSON.stringify(message));
            },
            sendMsg2: function(typeMsg, contact){
                console.log("Type_MSG: "+typeMsg+"User: "+contact);
                console.log("Type_MSG: "+typeMsg+"User: "+contact);
                sock.send(JSON.stringify({'TYPE': typeMsg, 'USER': contact}));
            },
            close: function(){
                $log.info("Closing websocket");
                sock.onclose = function () {};
                sock.close();
                window.onbeforeunload = undefined;
            }
        }
  });
