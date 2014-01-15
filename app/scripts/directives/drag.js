'use strict';

angular.module('video2browserApp')
  .directive('drag', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        element.attr("draggable",true);

        element.bind("dragstart", function(event){
            console.log("sending a dragStartEvent");
            scope.$emit("dragstart", "a");
        });
        element.bind("dragend", function(event){
            console.log("sending a dragEndEvent");
            scope.$emit("dragend", "a");
        });
      }
    };
  });
