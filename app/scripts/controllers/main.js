'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User) {
        $scope.identity = User.identity;
        $scope.contacts = User.contacts;
  });
