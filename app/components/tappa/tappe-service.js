'use strict';

var app = angular.module('myAppTappeService', []);


app.factory('Tappe', function ($firebaseArray, $firebaseObject) {
    var tappeService = {
        getData: function () {
            var ref = firebase.database().ref().child("tappe");
            return $firebaseArray(ref);
        },
        getTappeInfo: function (tappaId) {
            var tappaRef = firebase.database().ref().child("tappe").child(tappaId);
            return $firebaseObject(tappaRef);
        }
    };
    return tappeService;
});
