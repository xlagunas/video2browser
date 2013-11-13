'use strict';

angular.module('video2browserApp')
  .directive('capture', function () {
    return function (scope, element, attrs) {
//          element.getContext('2d')
//          element.text('this is the capture directive');
          var img = new Image;
          img.onload = function(){
              element.getContext('2d').drawImage(img,0,0); // Or at whatever offset you like
          };
          img.src = attrs.capture;
      };
  });
