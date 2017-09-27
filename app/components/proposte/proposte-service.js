'use strict';

var app = angular.module('myAppProposteService', []);


app.factory('ProposteService', function ($firebaseArray, $firebaseObject) {
    var proposteService = {

        aggiungiProposta: function (tappa, squadra, testo) {
            console.log("entra nella function che aggiunge un ragazzo");
            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("proposte");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                tappa: "" + tappa + "",
                squadra: squadra,
                testo: testo
            });
        },



        getData: function () {
            var ref = firebase.database().ref().child("proposte");
            return $firebaseArray(ref);
        },
        getProposteInfo: function (propostaId) {
            var propostaRef = firebase.database().ref().child("proposte").child(propostaId);
            return $firebaseObject(propostaRef);
        }


    };
    return proposteService;
});
