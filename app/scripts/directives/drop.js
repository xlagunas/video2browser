'use strict';

angular.module('video2browserApp')
  .directive('drop', function ($rootScope) {
    return function (scope, element, attrs) {
        element.bind("drop", function(event){
            event.preventDefault();
            if (event.dataTransfer.files.length >0){
                var files = event.dataTransfer.files;
                console.log("Dropped Files!" +files.length);
                for(var i=0;i<files.length;i++){
                    var reader = new FileReader();
                    reader.readAsDataURL(files[i]);
//                    reader.readAsBinaryString(files[i]);
//                    reader.readAsArrayBuffer(files[i]);

                    reader.onprogress = function(event) {
                        console.log("progress"+event);
                    };
                    reader.onload = (function(fileInfo){
                        return function(event){
                            console.log(fileInfo);
                            var dataURL = reader.result;
                            console.log("file read: "+dataURL);
                            console.log(reader.result);
                            var sendObject = {};
                            sendObject.file = fileInfo;
                            sendObject.data = reader.result;
                            scope.$emit("file_send", sendObject);
                        }
                    }(files[i]));
                }
            }
            else{
                console.log("Dropped User!");
                $rootScope.$broadcast("drop_user", event.dataTransfer.getData("Text"));
            }
            return false;

        });
        element.bind("dragover", function(event){
            event.preventDefault();
        });

        $rootScope.$on("dragstart", function(event, message){
            element.addClass("show-border");
        });

        $rootScope.$on("dragend", function(event, message){
            element.removeClass("show-border");
        });
    };
});
