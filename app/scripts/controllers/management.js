'use strict';

angular.module('video2browserApp')
//  .controller('ManagementCtrl', function ($scope, $log, pending, User, $http) {
  .controller('ManagementCtrl', function ($scope, $log, Websocket,User) {
        Websocket.emit('pending requests', User.getIdentity(), function(pending){
            console.log("callback cridat del pending contacts");
            console.log(pending);
            $scope.pending = pending;
        })

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
