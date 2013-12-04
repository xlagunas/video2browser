'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User) {
        $scope.identity = User.getIdentity();
        $scope.contacts = User.getContacts();
  });
