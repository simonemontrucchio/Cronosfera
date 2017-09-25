'use strict';

var app = angular.module('myAppBrevettiService', []);


app.factory('Brevetti', function ($firebaseArray, $firebaseObject) {
    var brevettiService = {
        getData: function () {
            var ref = firebase.database().ref().child("brevetti");
            return $firebaseArray(ref);
        },
        getBrevettiInfo: function (brevettoId) {
            var brevettoRef = firebase.database().ref().child("brevetti").child(brevettoId);
            return $firebaseObject(brevettoRef);
        }
    };
    return brevettiService;
});
