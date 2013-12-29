'use strict';

angular.module('video2browserApp')
  .service('User', function User($http, $log) {
        var identity = {'username':'xlagunas', 'name':'Xavier', 'middlename': 'Lagunas', 'surname': 'Calpe'};
        var contacts = [];
        var relationships = [];
        var init = false;

        return {
             'init': function(){
                 if (init === false){
                     $http({'method': 'GET', 'url': '../users'}).success(function(data){
                         identity = angular.copy(data, identity);
                         $http({'method': 'POST', 'url': '../users/list', 'data': identity}).success(function(data){
                             angular.copy(data,contacts);
                         });
                     });
                 init = true;
                 }
             },
             'getRelationships': function(){return relationships;},
             'getIdentity': function(){return identity;},
             'getContacts': function(){return contacts;},
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

                 angular.copy(addedContacts, contacts);
             },
             'replaceContact': function(contact){
                  for (var i=0;i<contacts.length;i++){
                      if (contacts[i].username == contact.username){
                         angular.copy(contact, contacts[i]);
                         $log.info("contact found, replacing it");
                          return contacts[i];
                      }
                  }
                  $log.warn("Contact not found, could not replace");
                  return null;
             },
             'handleContacts': function(contact){
                 if (contact instanceof Array){
                    $log.debug(contact)
                    contact.forEach(function(user){
                        var found = false;

                        $log.debug("Received new contact: "+user.username);
                        contacts.forEach(function(oldUser){
                            $log.debug("Checking "+user.username+" against "+oldUser.username);
                            if (oldUser.username == user.username){
                                $log.debug("found equivalence");
                                angular.copy(user,oldUser);
                                found = true;
                            }
                        })
                        if (!found){
                            $log.debug("contact not found, adding it");
                            contacts.push(user);
                        }
                    });
                 }
                else{
                     $log.info("Its not an array");
                     var found = false;
                     contacts.forEach(function(user){
                         $log.debug("Checking "+user.username+" against "+contact);
                         if(user.username == contact.username){
                             angular.copy(contact,user);
                             found = true;
                         }
                     });
                     if (!found){
                         $log.debug("contact not found, adding it");
                         contacts.push(contact);
                     }
                 }
             },
             'setIdentity': function(contact){
                 $log.debug("setting Identity");
                 $log.debug(contact);
                 identity = contact;
             },
             'setRelationships': function(addedRelationships){
                 $log.debug("setting relationships");
                 $log.debug(addedRelationships);
                 relationships = addedRelationships;
             }

         }
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
