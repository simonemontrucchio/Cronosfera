'use strict';

var app = angular.module('myAppRegistrazioneRagazzo', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'myAppUtente'
])

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/registrazioneRagazzo', {
            templateUrl: 'capo/registrazioneRagazzo/registrazioneRagazzo.html',
            controller: 'RegistrazioneRagazzoCtrl',
            resolve: {
                "currentAuth":["Auth",function(Auth) {
                    return Auth.$requireSignIn();
                }]
            }
        });
    }]);

app.controller('RegistrazioneRagazzoCtrl', ['$scope', '$rootScope', 'Mete', 'Impegni', 'RegistrazioneRagazzoService', '$firebaseStorage', 'Utente',
        function($scope, $rootScope, Mete, Impegni, RegistrazioneRagazzoService, $firebaseStorage, Utente) {

            //initialize variables
            $scope.dati = {};
            $scope.dati.sesso = "M";

            //define the function that will actually create a new record in the database
            $scope.registrazioneRagazzo = function() {

                $scope.dati.feedback = "";
                $scope.dati.error = "";

                console.log("ho premuto su REGISTRA");

                //check if the user inserted all the required information
                if ($scope.dati.codice!= undefined && $scope.dati.codice!="" && $scope.dati.nome!= undefined && $scope.dati.nome!="" && $scope.dati.cognome!=undefined && $scope.dati.cognome!="") {

                    //CONTROLLO CHE L'UTENTE NON ESISTA GIA'
                    var esistente = false;
                    $scope.control={};
                    $scope.control.utenti = Utente.getData();
                    $scope.control.utenti.$loaded().then(function () {
                        for (var i = 0; i < $scope.control.utenti.length; i++) {
                            if ($scope.control.utenti[i].ruolo == 'ragazzo' && $scope.control.utenti[i].codice == $scope.dati.codice) {
                                $scope.dati.error = "UTENTE GIA' ESISTENTE!";
                                esistente = true;
                            }
                        }
                        if (esistente == false) {
                            $scope.aggiuntaRagazzoFinale();
                        }
                    });



                }
                else
                {
                    //write an error message to the user
                    $scope.dati.error = "Hai dimenticato di inserire una informazione obbligatoria!";
                }
            };


            //function that will create the new record (with the boy) in the Firebase storage
            $scope.aggiuntaRagazzoFinale = function()
            {
                console.log("entro in aggiunta ragazzo finale");

                RegistrazioneRagazzoService.aggiungiRagazzo($scope.dati.codice, $scope.dati.nome, $scope.dati.cognome, $scope.dati.sesso).then(function(ref) {

                    console.log("uscito dal factory aggiungi ragazzo");

                    var ragazzoId = ref.key
                    console.log("Questo è il uuid del ragazzo: "+ ragazzoId);

                    $scope.dati.feedback = "Registrazione avvenuta con successo";

                });

                $scope.dati.scoperta="Scoperta";
                $scope.dati.competenza="Competenza";
                $scope.dati.responsabilita="Responsabilità";

                Mete.aggiungiMete($scope.dati.codice,$scope.dati.scoperta);
                Mete.aggiungiMete($scope.dati.codice,$scope.dati.competenza);
                Mete.aggiungiMete($scope.dati.codice,$scope.dati.responsabilita);

                for(var i = 0; i < 3; i++){
                    Impegni.aggiungiImpegni($scope.dati.codice, $scope.dati.scoperta)
                    Impegni.aggiungiImpegni($scope.dati.codice, $scope.dati.competenza)
                    Impegni.aggiungiImpegni($scope.dati.codice, $scope.dati.responsabilita)
                }

            }


        }]);