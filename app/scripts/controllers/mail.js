'use strict';

angular.module('video2browserApp')
  .controller('MailCtrl', function ($scope, $modal, $log) {

    $scope.openModal = function(){
        $modal.open(
            {
                'templateUrl': 'views/modal.html',
                'controller' : 'ModalCtrl'
            }
        );
    }

    $scope.ok = function(){
        $log.debug("Surto de la funcio amb un ok");
        $modal.close('ok');
    }

    $scope.cancel = function(){
        $log.debug("Surto de la funcio amb un error");
        $modal.dismiss('cancel');
    }
  });
