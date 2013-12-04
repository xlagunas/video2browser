'use strict';

angular.module('video2browserApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('home',{'url': '/' ,'templateUrl': 'views/main.html', 'controller': 'MainCtrl'} )
            .state('home.mail', {'url':'/mail',templateUrl: 'views/mail.html', controller: 'MailCtrl'})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddphotoCtrl'})
            .state('newUser', {'url':'/new-user',templateUrl: 'views/newUser.html', controller: 'NewuserCtrl'})
            .state('home.user', {'url':'/user/{username}',templateUrl: 'views/user.html', controller: 'UserCtrl'})
        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2ca.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;


    })
    .run(function(User, $http, $log){
        $log.debug("Entra al run");
        $http.get("http://localhost:8080/v2b/users/").then(function(response){
            User.setIdentity(response.data);
            $log.info(response);
        });

        $http.get('http://localhost:8080/v2b/users/list').then(function(response){
            User.setContacts(response.data);
            $log.info(response);
        });
    });
