'use strict';

var app = angular.module('myAppSceltaMaestro', [
    'ngRoute',
    'ngMaterial'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sceltaMaestro/:nomeSpecialita', {
        templateUrl: 'ragazzo/sentiero/sceltaMaestro/sceltaMaestro.html',
        controller: 'myAppSceltaMaestroCtrl'
    })
}]);

app.controller('myAppSceltaMaestroCtrl', ['$scope', '$rootScope', '$routeParams', 'Specialita', 'Utente', 'CartaSpecialita', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$location',
    function ($scope, $rootScope, $routeParams, Specialita, Utente, CartaSpecialita, RegistrazioneCartaSpecialitaService, $mdDialog, $location) {
        $scope.dati = {};
        $scope.dati.utenti = Utente.getData();
        $scope.dati.specialita = Specialita.getData();
        $scope.dati.carte_specialita = CartaSpecialita.getData();
        $scope.status = '';
        $scope.customFullscreen = false
        $scope.dati.nomeSpec = $routeParams.nomeSpecialita

        $scope.dati.maestro = "";


        $scope.dati.maestroTemp = {};


        $scope.trovaMaestro = function () {
            $scope.dati.utenti = Utente.getData();
            $scope.dati.utenti.$loaded().then(function () {
                for (var i = 0; i < $scope.dati.utenti.length; i++) {
                    if ($scope.dati.utenti[i].codice == $scope.dati.maestro) {
                        $scope.dati.maestroTemp = $scope.dati.utenti[i];
                    }
                }
            });
        };


        $scope.salvaCartaSpecialita = function () {

            $scope.dati.feedback = "";
            $scope.dati.error = "";

            console.log("ho premuto su REGISTRA");

            //check if the user inserted all the required information
            if ($scope.dati.maestro != undefined && $scope.dati.maestro != "" && $scope.dati.motivazione != undefined && $scope.dati.motivazione != "") {
                for (var i = 0; i < $scope.dati.specialita.length; i++) {
                    if ($scope.dati.specialita[i].nome == $routeParams.nomeSpecialita) {
                        $scope.dati.url = $scope.dati.specialita[i].img_url;
                        $scope.dati.id = $scope.dati.specialita[i].$id;
                    }
                }
                $scope.registraCarta();
            }
            else {
                //write an error message to the user
                $scope.dati.error = "Hai dimenticato di inserire una informazione obbligatoria!";
            }

        };


        //function that will create the new record (with the boy) in the Firebase storage
        $scope.registraCarta = function () {
            console.log("entra in registra");


            RegistrazioneCartaSpecialitaService.aggiungiCarta($scope.dati.url, $scope.dati.maestro, $scope.dati.motivazione, $routeParams.nomeSpecialita, $rootScope.info.user.codice, $scope.dati.id).then(function (ref) {
                console.log("uscito dal factory aggiungi carta");
                var cartaSpecialitaId = ref.key
                console.log("Questo è il uuid delal carta: " + cartaSpecialitaId);

                $rootScope.info.cartaSpec = {};
                $rootScope.info.cartaSpec = CartaSpecialita.getCartaInfo(cartaSpecialitaId);

                $scope.dati.feedback = "Registrazione avvenuta con successo";
                $location.path("/scadenzeCarta/" + cartaSpecialitaId);

            });


        }


    }])