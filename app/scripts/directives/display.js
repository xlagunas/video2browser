'use strict';

angular.module('video2browserApp')
  .directive('display', function ($sce, $log) {
    return {
      scope:{
          'height': '@',
          'width': '@',
          'stream': '=',
          'contact': '='
      },
      templateUrl: 'views/display.html',
      restrict: 'E',
      replace: false,
      link: function (scope, element, attrs) {
        scope.controlBar = false;

        if (attrs.muted != null){
            console.log("audio disabled");
            element.find("video")[0].muted = true;
        }else{
            console.log("audio enabled")
        }

        if (attrs.menu != null){
            console.log("enabling mouseEvents");
            element.bind("mouseenter", function(event){
                scope.controlBar = true;
                scope.$apply();
            });
            element.bind("mouseleave", function(event){
                scope.controlBar = false;
                scope.$apply();
            });
        }
          else{
            console.log("disabling mouseEvents")


        }

      },
      controller: function($scope, $sce, $log){
          $scope.trustSource = function(url){
              return $sce.trustAsResourceUrl(url);
          };

          $scope.toggleAudio = function(){
              $log.info($scope.volume);
              $scope.volume = 0;
          }
      }
    };
  });
