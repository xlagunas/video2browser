'use strict';

angular.module('video2browserApp', ['ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('login',{'url': '/login', templateUrl: 'views/login.html', controller: 'LoginCtrl'})
            .state('home',{'url': '/', templateUrl: 'views/main.html', controller: 'MainCtrl'})
            .state('home.mail', {'url':'/mail',templateUrl: 'views/mail.html', controller: 'MailCtrl'})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddPhotoCtrl'})
            .state('newUser', {'url':'/new-user',templateUrl: 'views/newUser.html', controller: 'NewUserCtrl'})
            .state('home.user', {'url':'/user/{username}',templateUrl: 'views/user.html', controller: 'UserCtrl'})
            .state('home.conference', {'url':'/conference/{roomId}',templateUrl: 'views/conference.html', controller: 'ConferenceCtrl'})
            .state('home.management', {'url':'/management',templateUrl: 'views/management.html',
                controller: 'ManagementCtrl'
//                ,
//                resolve: {
//                    pending: function(Websocket, User){
//                        Websocket.emit('pending requests', User.getIdentity(), function(data){
//                            return data;
//                        })
//                    }}
            })
            .state('home.candidates', {'url':'/candidates/{keyword}',templateUrl: 'views/candidates.html', controller: 'CandidatesCtrl'});


        $urlRouterProvider.otherwise('/login');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2cat.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;



    })
    .run(function($log, Websocket, $rootScope, User, $state){
        $log.debug("Entra al run");

        window.onbeforeunload = function(event){
            console.log("loading the onbeforeUnload method");
            Websocket.emit('shutdown', User.getIdentity());
            Websocket.close();
        }
        $rootScope.$on('$stateChangeStart', function (event, current, previous) {
            console.log('$stateChangeStart');
//            if ((current.name != 'login' || current.name != 'newUser') && User.getAuthentication() == false){
            var publicLinks = ['login','newUser'];
            console.log(publicLinks.indexOf(current.name));
            if (publicLinks.indexOf(current.name)==-1 && User.getAuthentication() == false){
//            if (User.getAuthentication() == false || publicLinks.indexOf(current.name)==-1){
                $log.info("User not authenticated, redirecting to login");
                event.preventDefault();
                $state.go('login');
            }

        });
    });
