'use strict';

angular.module('video2browserApp')
  .filter('contactFilter', function () {
    return function (input) {
      return 'contactFilter filter: ' + input;
    };
  });
