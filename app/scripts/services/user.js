'use strict';

angular.module('video2browserApp')
  .service('User', function User($http, $log) {
        var identity = {'username':'xlagunas', 'name':'Xavier', 'middlename': 'Lagunas', 'surname': 'Calpe'};
        var contacts = [];


        return {
             'queryIdentity': function(){
                 $http({'method': 'GET', 'url':'/v2b/users/'});
             },
             'queryContacts': function(){
                 $http({'method': 'POST', 'url': '/v2b/users/list', 'data': identity});
             },
             'getIdentity': function(){return identity},
             'getContacts': function(){return contacts},
             'getContactByUsername' : function(username){
                 if (!contacts)
                 {
                     $log.error("No contacts array");
                     return null;
                 }
                 for (var i=0;i<contacts.length;i++){
                     if(contacts[i].username === username)
                        return contacts[i];
                 }
                 $log.debug("contact "+username+" not found, returning null");
                 return null;
             },
             'setContacts': function(addedContacts){
                 $log.debug("setting Contacts");
                 $log.debug(addedContacts);
                 contacts = addedContacts;
             },
             'setIdentity': function(contact){
                 $log.debug("setting Identity");
                 $log.debug(contact);
                 identity = contact;
             }

         }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
