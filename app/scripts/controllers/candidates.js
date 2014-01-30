'use strict';

angular.module('video2browserApp')
  .controller('CandidatesCtrl', function ($scope,$log, User, $stateParams, Websocket) {

         Websocket.emit('find candidates', {username: $stateParams.keyword}, function(data){
            $scope.list = data;
            $log.info($scope.list);
         });


    $scope.requestFriendship = function(contact){
        console.log(contact);
//        $http({'method': 'PUT', 'url': '../relationships/create',
//            'data':{'proposer': User.getIdentity(), 'contact': contact}})
//            .success(function(data){
//                $log.info(data);
//            })
    }
  });
