'use strict';

angular.module('video2browserApp')
  .directive('contact', function ($log) {
    return {
      scope: {
          user: "="
          },
      restrict: 'E',
      templateUrl: 'views/contact.html',
      link: function(scope, element, attrs){
          element.bind("dragstart", function(event){
              $log.info(event);
              console.log("dragstart "+scope.user.username);
              event.originalEvent.dataTransfer.setData("Text",scope.user.username);
          });
      }
    };
  });
