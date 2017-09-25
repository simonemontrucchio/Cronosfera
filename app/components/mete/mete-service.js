'use strict';


var app = angular.module('myAppMeteService', [])
app.factory('Mete', function ($firebaseArray, $firebaseObject) {
    var meteService = {
        getData: function () {
            var ref = firebase.database().ref().child("mete");
            // download the data into a local object
            return $firebaseArray(ref);
        },

        getMeteInfo: function (meteId) {
            var meteRef = firebase.database().ref().child("mete").child(meteId);
            return $firebaseObject(meteRef);
        },


        aggiungiMete: function (codice, tappa) {
            var ref = firebase.database().ref().child("mete");
            return $firebaseArray(ref).$add({
                azione: "",
                codice: "" + codice + "",
                tappa: tappa
            });
        },


        aggiornaMetaAzione: function (id, nuovaAzione) {
            console.log("entra nella function che aggiunge mete");

            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("mete").child(id);
            // create a synchronized array
            ref.update({
                azione: nuovaAzione
            });
        }

    }
    return meteService;
})

