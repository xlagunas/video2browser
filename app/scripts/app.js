'use strict';

angular.module('video2browserApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('home',{'url': '/' ,'templateUrl': 'views/main.html', 'controller': 'MainCtrl'} )
            .state('login',{'url': '/login', 'templateUrl': 'views/login.html','controller':'LoginCtrl'})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddphotoCtrl'})
        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2ca.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;

    });
