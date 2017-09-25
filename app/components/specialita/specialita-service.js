'use strict';

var app = angular.module('myAppSpecialitaService', []);


app.factory('Specialita', function ($firebaseArray, $firebaseObject) {
    var specialitaService = {
        getData: function () {
            var ref = firebase.database().ref().child("specialita");
            return $firebaseArray(ref);
        },
        getSpecInfo: function (specId) {
            var specRef = firebase.database().ref().child("specialita").child(specId);
            return $firebaseObject(specRef);
        }
    };
    return specialitaService;
});
