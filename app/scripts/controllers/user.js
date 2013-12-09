'use strict';

angular.module('video2browserApp')
  .controller('UserCtrl', function ($scope, $stateParams,$log, User) {
    $scope.user = User.getContactByUsername($stateParams.username);

    $log.debug($stateParams);
  });
