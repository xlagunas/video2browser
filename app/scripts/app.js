'use strict';

angular.module('video2browserApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('home',{'url': '/' ,'templateUrl': 'views/main.html', 'controller': 'MainCtrl'} )
            .state('login',{'url': '/login', 'templateUrl': 'views/login.html','controller':'LoginCtrl'})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddphotoCtrl'})
            .state('newUser', {'url':'/new-user',templateUrl: 'views/newUser.html', controller: 'NewuserCtrl'})
        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2ca.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;

    })
    .run(function(User, $http, $log){
        $log.debug("Entra al run");
        $http.get('http://localhost:8080/v2b/users/list').success(function(data){
            User.contacts = data;
            $log.info(data);


            var protocols = ['websocket', 'xdr-streaming', 'xhr-streaming', 'iframe-eventsource', 'iframe-htmlfile',
                'xdr-polling', 'xhr-polling', 'iframe-xhr-polling', 'jsonp-polling' ];

            //var sock = new SockJS(document.URL+"/socket/", undefined, {protocols_whitelist: protocols, debug: true });
            var sock = new SockJS("http://localhost:8080/v2b/socket/", undefined, {protocols_whitelist: protocols, debug: true });
            sock.onopen = function(){console.log("obert desde angular");};

//            sock.onmessage = function(e){
//                console.log("message des d'angular: ",e.data);
//                msg = JSON.parse(e.data);
//                if (msg.messageType == "ADD_USER"){
//                    ContactService.addContact({"idFriendship":5,"name":"TEST Lagunas Calpe","username":"clagunas","image":"resources/img/default_avatar.png","friendshipStatus":"PENDING","status":"OFFLINE"});
//                }
//
//            };

            sock.onclose = function(){
                console.log("tancat");
            };
        });
    });
