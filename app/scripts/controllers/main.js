'use strict';

angular.module('video2browserApp')
  .controller('MainCtrl', function ($scope, User, $state, $log, Websocket) {
//    User.init();

    $scope.identity = User.getIdentity();
    $scope.contacts = User.getContacts();
    $log.info("Carrego el MainCtrl!");

    $scope.findCandidates = function(keyword){
        $log.info(keyword);
        $state.go("candidates", {'keyword':keyword});
    }

    Websocket.on('duplicated session', function(data){
        console.log("detected duplicated session!!");
        console.log(data);
    });

    Websocket.on('roster', function(data){
        $log.info('rebo informació roster!');
        $log.info(data);

        User.handleContacts(data);
    });


  });
