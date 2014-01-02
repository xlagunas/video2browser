'use strict';

angular.module('video2browserApp', ['ui.router', 'ui.bootstrap'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('home',{'url': '/'})
            .state('mail', {'url':'/mail',templateUrl: 'views/mail.html', controller: 'MailCtrl'})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddPhotoCtrl'})
            .state('newUser', {'url':'/new-user',templateUrl: 'views/newUser.html', controller: 'NewUserCtrl'})
            .state('user', {'url':'/user/{username}',templateUrl: 'views/user.html', controller: 'UserCtrl'})
            .state('conference', {'url':'/conference/{roomId}',templateUrl: 'views/conference.html', controller: 'ConferenceCtrl'})
            .state('management', {'url':'/management',templateUrl: 'views/management.html',
                controller: 'ManagementCtrl',
                resolve: {
                    pending: function($http, User){
                        return $http({'method': 'GET', 'url': '../relationships/requested/'+User.getIdentity().idUser})
                    }}
            })
            .state('candidates', {'url':'/candidates/{keyword}',templateUrl: 'views/candidates.html',
                controller: 'CandidatesCtrl',
                resolve: {
                    candidates: function($http, User, $stateParams){
                        return $http({'method': 'POST', 'url': '../users/search/'+$stateParams.keyword,
                            'data': User.getIdentity()})
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2cat.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;


    })
    .run(function($log, Websocket){
        $log.debug("Entra al run");

        window.onbeforeunload = function(event){
            console.log("loading the onbeforeUnload method");
            Websocket.close();
        }
    });
