'use strict';

angular.module('video2browserApp')
  .controller('MailCtrl', function ($scope, $modal, $log, $rootScope) {

    $scope.openModal = function(){
        $modal.open(
            {
                'templateUrl': 'views/modal.html',
                'controller' : 'ModalCaller'
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

    //$rootScope.$on("drop_user", function(event, message){
    //    $log.debug("Detecto event d'enviament de missatge");
    //    $log.debug(message);
    //    $modal.open({
    //        'templateUrl': 'views/modalInvite.html',
    //        'controller' : 'ModalInviteCtrl',
    //        'resolve' : {
    //            'username': function() {return message}
    //        }
    //    })
    //    $log.debug("___________")
    //});
  });
