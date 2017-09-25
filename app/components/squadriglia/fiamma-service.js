'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppSquadriglia.fiammaService', [])

    .factory('Fiamma', function ($firebaseArray) {
        var FiammaService = {

            aggiornaFiamma: function (uuidVecchiaSq, uuidNuovaSq) {

                console.log("sono entrato nel fiamma service, aggiorna fiamma");
                console.log("NEL SERVICE - uuid vecchia Sq: " + uuidVecchiaSq);
                console.log("NEL SERVICE - uuid nuova Sq: " + uuidNuovaSq);


                var refOld = firebase.database().ref().child("squadriglie").child(uuidVecchiaSq);
                // create a synchronized array
                refOld.update({
                    fiamma: false
                });

                var refNew = firebase.database().ref().child("squadriglie").child(uuidNuovaSq);
                // create a synchronized array
                refNew.update({
                    fiamma: true
                });
            }
        };
        return FiammaService;
    });