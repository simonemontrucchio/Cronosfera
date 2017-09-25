'use strict';


var app = angular.module('myAppRegistrazioneCartaSpecialitaService', []);


app.factory('RegistrazioneCartaSpecialitaService', function ($firebaseArray) {

    var NuovaCartaSpecialita = {
        aggiungiCarta: function (img_url, codiceMaestro, motivazione, specialitaNome, codiceRagazzo, specialitaCodice) {
            console.log("entra nella function che aggiunge un ragazzo");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("carte_specialita");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                img_url: img_url,
                maestro: "" + codiceMaestro + "",
                motivazione: "" + motivazione + "",
                nome: "" + specialitaNome,
                ragazzo: "" + codiceRagazzo + "",
                specialita: specialitaCodice,
                attiva: false
            });
        }
    };
    return NuovaCartaSpecialita;
});

