'use strict';

angular.module('video2browserApp')
  .controller('ModalCalleeCtrl', function ($scope, $modal, $modalInstance, $log, sender, callType, User) {
        $scope.contact = User.getContactByUsername(sender);
        $scope.callType = callType;

        $log.debug($scope.contact);
        $log.debug($scope.callType);



        $scope.openModal = function(){
            $modal.open(
                {
                    'templateUrl': 'views/modal.html'
                }
        );
    }

    $scope.ok = function(){
        $log.debug("Surto de la funcio amb un ok");
        $modalInstance.close($scope.contact);
    }

    $scope.cancel = function(){
        $log.debug("Surto de la funcio amb un error");
        $modalInstance.dismiss('cancel');
    }
  });
