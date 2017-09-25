'use strict';


var app = angular.module('myAppImpegniService', [])
app.factory('Impegni', function ($firebaseArray, $firebaseObject) {
    var impegniService = {
        getData: function () {
            var ref = firebase.database().ref().child("impegni");
            // download the data into a local object
            return $firebaseArray(ref);
        },

        getImpegniInfo: function (impegniId) {
            var impegniRef = firebase.database().ref().child("impegni").child(impegniId);
            return $firebaseObject(impegniRef);
        },


        aggiungiImpegni: function (codiceRagazzo, tappa) {
            var ref = firebase.database().ref().child("impegni");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                azione: "",
                codice: "" + codiceRagazzo + "",
                tappa: tappa
            });
        },

        aggiornaImpegnoAzione: function (id, nuovaAzione) {

            var ref = firebase.database().ref().child("impegni").child(id);
            // create a synchronized array
            ref.update({
                azione: nuovaAzione
            });
        }
    }
    return impegniService;
})

