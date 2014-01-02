'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User, $state, $log, $window, $modal, $rootScope) {
    User.init();

    $scope.identity = User.getIdentity();
    $scope.contacts = User.getContacts();

    $scope.findCandidates = function(keyword){
        $log.info(keyword);
        $state.go("candidates", {'keyword':keyword});
    }

    $scope.$on("myEvent", function(event, msg){
        $log.debug("************rebo un msg via event");
        $log.debug(msg);
        $log.debug("************rebo un msg via event");

    });


    });
