'use strict';

//The service implemented in this module will get information about a single pizza: the one specified by the Id passed as argument of the function
angular.module('myAppSingleSpecialitaService', [
    'myAppSpecialita',
    'ngMaterial'

])

    .factory('SingleSpecialita', function ($firebaseObject) {
        var singleSpecialitaService = {
            getSingleSpecialita: function (nome) {
                var ref = firebase.database().ref().child("specialita").child(nome);
                // download the data into a local object
                return $firebaseObject(ref);
            }
        };
        return singleSpecialitaService;
    });
