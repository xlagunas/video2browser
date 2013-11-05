'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.users = User.contacts;
  });
