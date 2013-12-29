'use strict';

angular.module('video2browserApp')
  .controller('ManagementCtrl', function ($scope, $log, pending, User, $http) {
        $log.debug(pending);
        $scope.pending = pending.data;

        $scope.accept = function(friendship){
             friendship.status = "ACCEPTED";
             $scope.update(friendship);
        }

        $scope.reject = function(friendship){
            friendship.status = "REJECTED";
            $scope.update(friendship);
        }

        $scope.update = function(friendship){
            $http({method: 'POST', url:'../relationships/update',data: friendship})
                .success(function(data){
                    $log.debug(data);
                })
        }
  });
