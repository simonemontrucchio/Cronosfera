'use strict';

//The service implemented in this module will get information about all the available pizzas
angular.module('myAppUtente.utentiService', [])

    .factory('Utente', function ($firebaseArray, $firebaseObject) {
        var utentiService = {

            getUserInfo: function (userId) {
                var userRef = firebase.database().ref().child("utenti").child(userId);
                return $firebaseObject(userRef);
            },


            getData: function () {
                var ref = firebase.database().ref().child("utenti");
                // download the data into a local object
                return $firebaseArray(ref);
            },


            aggiornaFoto: function (codice, nuovaFoto) {
                var ref = firebase.database().ref().child("utenti").child(codice);
                // create a synchronized array
                ref.update({
                    img: nuovaFoto
                });

            },


            /**
             * GESTIONE LOGIN UTENTI
             *
             * **/
            registerLogin: function (userId, email) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti").child(userId);
                // create a synchronized array
                ref.update({
                    email: email,
                    logged: true
                });
            },
            registerLogout: function (userId) {
                var ref = firebase.database().ref().child("utenti").child(userId);
                // create a synchronized array
                ref.update({
                    logged: false
                });
            },


            /**
             * REGISTRAZIONE NUOVO CAPO
             *
             * **/
            registerNewUserInfo: function (userId, nome, componenti, email) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti").child(userId);
                // create a synchronized array
                ref.set({
                    nome: nome,
                    componenti: componenti,
                    email: email,
                    logged: false,
                    img: "../images/default_profile.png",
                    ruolo: "squadra",
                });
            }


        };
        return utentiService;
    });
