'use strict';

angular.module('video2browserApp')
  .controller('CandidatesCtrl', function ($scope,$log, User, $stateParams, Websocket) {

         Websocket.emit('find candidates', {username: $stateParams.keyword}, function(data){
            $scope.list = data;
            $log.info($scope.list);
         });


    $scope.requestFriendship = function(contact){
        console.log(contact);

        Websocket.emit('create request',
            {   requester:
                {
                    username: User.getIdentity().username,
                    _id: User.getIdentity()._id
                },
                requested: contact},
            function(data){
                console.log(data);
            }
        );
//        $http({'method': 'PUT', 'url': '../relationships/create',
//            'data':{'proposer': User.getIdentity(), 'contact': contact}})
//            .success(function(data){
//                $log.info(data);
//            })
    }
  });
