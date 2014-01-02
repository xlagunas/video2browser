'use strict';

angular.module('video2browserApp')
  .controller('ModalCallerCtrl', function ($scope, $modal,$rootScope, $modalInstance, $log) {

        $scope.openModal = function(){
            $modal.open(
                {
                    'templateUrl': 'views/modal.html'
                }
        );
    }
    $rootScope.$on("close_popup",function(event, message){
       $modalInstance.close();
    });

  });
