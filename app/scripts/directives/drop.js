'use strict';

angular.module('video2browserApp')
  .directive('drop', function ($rootScope) {
    return function (scope, element, attrs) {
        element.bind("drop", function(event){
            event.preventDefault();
             $rootScope.$broadcast("drop_user", event.dataTransfer.getData("Text"));
        });
        element.bind("dragover", function(event){
            event.preventDefault();
        });

        $rootScope.$on("dragstart", function(event, message){
            element.removeClass("hide-border");
        });

        $rootScope.$on("dragend", function(event, message){
            element.addClass("hide-border");
        });
    };
});
