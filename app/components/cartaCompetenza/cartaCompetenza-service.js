'use strict';

var app=angular.module('myAppCartaCompetenzaService',[])

app.factory('CartaCompetenza', function($firebaseArray, $firebaseObject) {
    var cartaCompetenzaService= {
        getData: function () {
            var ref = firebase.database().ref().child("carta_competenza");
            // download the data into a local object
            return $firebaseArray(ref);
        },
        getCartaInfo: function(cartaId) {
            var cartaRef = firebase.database().ref().child("carta_competenza").child(cartaId);
            return $firebaseObject(cartaRef);
        },
        aggiungiCarta: function (elenco_specialita, img_url, codiceMaestro, motivazione, brevettoNome, codiceRagazzo, brevettoCodice) {
            console.log("entra nella function che aggiunge un ragazzo");


            //add the user to list of users and set the logged value to true
            var ref = firebase.database().ref().child("carta_competenza");
            // create a synchronized array
            return $firebaseArray(ref).$add({
                img_url:img_url,
                maestro:""+codiceMaestro+"",
                motivazione:""+motivazione+"",
                nome:""+brevettoNome,
                ragazzo:""+codiceRagazzo+"",
                brevetto:brevettoCodice,
                elenco_spec_collegate:elenco_specialita,
                attiva : false
            });
        },
        aggiornaCompetenzaElenco: function(codice, elencoSpec) {
            var ref = firebase.database().ref().child("carta_competenza").child(codice);
            // create a synchronized array
            ref.update({
                elenco_spec_scelte: elencoSpec
            })
        }
    }
    return cartaCompetenzaService;
})
