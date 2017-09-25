'use strict';


var app = angular.module('myAppCartaSpecialitaService', [])
app.factory('CartaSpecialita', function ($firebaseArray, $firebaseObject) {
    var cartaSpecialitaService = {
        getData: function () {
            var ref = firebase.database().ref().child("carte_specialita");
            // download the data into a local object
            return $firebaseArray(ref);
        },
        getCartaInfo: function (cartaId) {
            var cartaRef = firebase.database().ref().child("carte_specialita").child(cartaId);
            return $firebaseObject(cartaRef);
        }
    }
    return cartaSpecialitaService;
})
