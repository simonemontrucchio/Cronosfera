'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppEvento.eventiService', [])

    .factory('Evento', function ($firebaseArray) {
        var eventiService = {
            getData: function () {
                var ref = firebase.database().ref().child("eventi");
                // download the data into a local object
                return $firebaseArray(ref);
            }

        };
        return eventiService;
    });
