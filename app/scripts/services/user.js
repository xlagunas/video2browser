'use strict';

angular.module('video2browserApp')
  .service('User', function User($http) {
         return {
             'identity': {'username':'xlagunas', 'name':'Xavier', 'middlename': 'Lagunas', 'surname': 'Calpe'},
             'contacts': {}
         }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
