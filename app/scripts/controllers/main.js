'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User, $state, $log, Websocket, $window) {
    User.init();

    $scope.identity = User.getIdentity();
    $scope.contacts = User.getContacts();

    $scope.findCandidates = function(keyword){
        $log.info(keyword);
        $state.go("candidates", {'keyword':keyword});
    }

  });
