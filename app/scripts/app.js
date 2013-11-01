'use strict';

angular.module('video2browserApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
        $stateProvider
            .state('home',{'url': '/' ,'templateUrl': 'views/main.html', 'controller': 'MainCtrl'} )
            .state('login',{'url': '/login', 'templateUrl': 'views/login.html','controller':'LoginCtrl'});

        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2ca.net/]);

    });
