'use strict';

var app = angular.module('myAppScadenzeService', []);


app.factory('Scadenza', function ($firebaseArray, $firebaseObject) {
    var scadenzeService = {
        getData: function () {
            var ref = firebase.database().ref().child("scadenze");
            return $firebaseArray(ref);
        },

        aggiornaScadenze: function (uuid, checked) {
            console.log("sono entrato nello scadenze service, aggiorna scadenze");
            console.log("NEL SERVICE - uuid: " + uuid);
            console.log("NEL SERVICE - checked: " + checked);

            var ref = firebase.database().ref().child("scadenze").child(uuid);
            // create a synchronized array
            if (checked == 'true') {
                ref.update({
                    conferma: true
                });
            }
        },


        creaScadenza: function (azione, carta_specialita, data, deadline, nomeRagazzo, nomeSpecialita, ragazzo, specialita) {
            console.log("entra nella function che aggiunge una scadenza");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("scadenze");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                azione: azione,
                carta_spec: carta_specialita,
                conferma: false,
                data: "" + data + "",
                deadline: "" + deadline + "",
                nome_ragazzo: nomeRagazzo,
                nome_specialita: nomeSpecialita,
                ragazzo: "" + ragazzo + "",
                specialita: specialita
            });
        },

        getScadenzaInfo: function (scadenzaId) {
            var scadenzaRef = firebase.database().ref().child("scadenze").child(scadenzaId);
            return $firebaseObject(scadenzaRef);
        },


        aggiornaDeadline: function (uuid, newDeadline) {
            var ref = firebase.database().ref().child("scadenze").child(uuid);
            // create a synchronized array
            ref.update({
                deadline: "" + newDeadline + ""
            });
        }

    }
    return scadenzeService;
});

