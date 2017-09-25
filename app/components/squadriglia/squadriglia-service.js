'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppSquadriglia.squadrigliaService', [])

    .factory('Squadriglia', function ($firebaseArray) {
        var squadrigliaService = {
            getData: function () {
                var ref = firebase.database().ref().child("squadriglie");
                // download the data into a local object
                return $firebaseArray(ref);
            }
        };
        return squadrigliaService;
    });
