'use strict';

angular.module('video2browserApp')
  .directive('contact', function () {
    return {
      scope: {
          user: "="
          },
      restrict: 'E',
      template: '<div>{{user.username}}:{{user.name}}_{{user.middlename}}_{{user.surname}}<div>{{user.thumbnail}}</div><div>{{user.status}}</div></div>'
    };
  });
