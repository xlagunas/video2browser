'use strict';

angular.module('video2browserApp')
  .controller('CandidatesCtrl', function ($scope,$log, candidates, User, $http) {

        $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.list = candidates.data;

    $scope.requestFriendship = function(contact){
        $http({'method': 'PUT', 'url': '../relationships/create',
            'data':{'proposer': User.getIdentity(), 'contact': contact}})
            .success(function(data){
                $log.info(data);
            })
    }
  });
