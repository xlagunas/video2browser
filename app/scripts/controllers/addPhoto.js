'use strict';

angular.module('video2browserApp')
  .controller('AddPhotoCtrl', function ($scope, $log, $rootScope, $sce) {

     $scope.localMediaStream = {};

     $scope.initMedia = function(){
         var userMedia = getUserMedia({'video':true, 'audio': false},function(localMediaStream){
                 window.URL = window.URL || window.webkitURL;
                 $scope.localMediaStream.url= window.URL.createObjectURL(localMediaStream);
                 $rootScope.$apply();
             },
             function(err){
                 console.log("initMedia error "+err);
             }
         );
     };

     $scope.trustSrc = function(src) {
          return $sce.trustAsResourceUrl(src);
     };

    $scope.initMedia();

    });
