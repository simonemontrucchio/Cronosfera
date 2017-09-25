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

            aggiornaStaff: function (uuid, checked) {
                console.log("sono entrato nello staff service, aggiorna staff");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - checked: " + checked);

                var ref = firebase.database().ref().child("utenti").child(uuid);
                // create a synchronized array
                if (checked == 'true') {
                    ref.update({
                        staff: true
                    });
                }
                else if (checked == 'false') {
                    ref.update({
                        staff: false
                    });
                }
            },

            aggiornaSq: function (uuid, newSq) {
                console.log("sono entrato nello sq service, aggiorna sq");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - newSq: " + newSq);

                var ref = firebase.database().ref().child("utenti").child(uuid);
                // create a synchronized array
                ref.update({
                    sq: newSq
                });
            },

            aggiornaTappa: function (uuid, newTappa) {
                console.log("sono entrato nello sq service, aggiorna tappa");
                console.log("NEL SERVICE - uuid: " + uuid);
                console.log("NEL SERVICE - newSq: " + newTappa);

                var ref = firebase.database().ref().child("utenti").child(uuid);
                // create a synchronized array
                ref.update({
                    tappa: newTappa
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
            registerNewUserInfo: function (userId, nome, cognome, email, codice) {
                //add the user to list of users and set the logged value to true
                var ref = firebase.database().ref().child("utenti").child(userId);
                // create a synchronized array
                ref.set({
                    nome: nome,
                    cognome: cognome,
                    email: email,
                    codice: codice,
                    logged: false,
                    staff: false,
                    img: false,
                    ruolo: "capo",
                });
            }


        };
        return utentiService;
    });
