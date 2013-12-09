'use strict';

angular.module('video2browserApp', ['ui.router'])
  .config(function ($stateProvider, $urlRouterProvider, $sceDelegateProvider, $httpProvider) {
        $stateProvider
            .state('home',{'url': '/' ,'templateUrl': 'views/main.html', 'controller': 'MainCtrl'
//                , 'resolve': {
////                    loggedUser: function($http){
////                        console.log("Loading via loggedUser!");
////                        return $http({'method': 'GET', 'url': 'http://localhost:8080/v2b/users/'})
////                    }
//                    promiseObj:  function($http){
//                        // $http returns a promise for the url data
//                        return $http({method: 'GET', url: 'http://localhost:8080/v2b/users/'});
//                    }
//                }
    } )
            .state('home.mail', {'url':'/mail',templateUrl: 'views/mail.html', controller: 'MailCtrl',
                'resolve': {
//                    loggedUser: function($http){
//                        console.log("Loading via loggedUser!");
//                        return $http({'method': 'GET', 'url': 'http://localhost:8080/v2b/users/'})
//                    }
            promiseObj:  function($http){
                // $http returns a promise for the url data
                return $http({method: 'GET', url: 'http://localhost:8080/v2b/users/'});
            }
        }})
            .state('addPhoto', {'url':'/add-photo',templateUrl: 'views/addPhoto.html', controller: 'AddphotoCtrl'})
            .state('newUser', {'url':'/new-user',templateUrl: 'views/newUser.html', controller: 'NewuserCtrl'})
            .state('home.user', {'url':'/user/{username}',templateUrl: 'views/user.html', controller: 'UserCtrl'})
        $urlRouterProvider.otherwise('/');
        $sceDelegateProvider.resourceUrlWhitelist(['self', /^https?:\/\/(cdn\.)?vb2.i2ca.net/]);
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json' ;


    })
    .run(function(User, $http, $log){
        $log.debug("Entra al run");
//        $http.get("http://localhost:8080/v2b/users/").then(function(response){
//            User.setIdentity(response.data);
//            $log.info(response);
//
//        });

//        $http.post('http://localhost:8080/v2b/users/list', User.getIdentity()).then(function(response){
//            $apply(function(){
//                User.setContacts(response.data);
//                $log.info(response);
//            });
//
//        })

    });
