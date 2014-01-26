'use strict';

angular.module('video2browserApp')
  .controller('MailCtrl', function ($scope, $modal, $log, $rootScope, $sce, User) {
    $scope.size = {
            height: "480",
            width: "640"
    }
        $scope.volume = {level : 1.0};
    $scope.openModal = function(){
        $modal.open(
            {
                'templateUrl': 'views/modal.html',
                'controller' : 'ModalCaller'
            }
        );
    }

    $scope.contact = {};

    $scope.ok = function(){
        $log.debug("Surto de la funcio amb un ok");
        $modal.close('ok');
    }

    $scope.cancel = function(){
        $log.debug("Surto de la funcio amb un error");
        $modal.dismiss('cancel');
    }

    $scope.localStream = {}

    var stream = {};
        navigator.webkitGetUserMedia({video:true, audio: true}, function(streami){
           $scope.localStream.url = window.URL.createObjectURL(streami);
           $scope.contact = User.getContacts()[0];
           $log.debug("contact selected: "+$scope.contact.username);
           $scope.$apply();

        }, null);

    $scope.trustSrc = function(src) {
        $log.info("stream: "+stream)
        $log.info("entra al trustSrc de la funcio");
        return $sce.trustAsResourceUrl(src);
    };

    $scope.$on("file_send", function(event, message){
        $log.info("Rebo event file_send");
        $log.info(message);
    });


  });
