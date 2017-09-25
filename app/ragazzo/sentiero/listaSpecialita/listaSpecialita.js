'use strict';

var app = angular.module('myAppListaSpecialita', [
    'ngMaterial',
    'ngRoute'
]);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/listaSpecialita', {
        templateUrl: 'ragazzo/sentiero/listaSpecialita/listaSpecialita.html',
        controller: 'myAppListaSpecialitaCtrl'
    })
}]);

app.controller('myAppListaSpecialitaCtrl', ['$scope', '$rootScope', 'Specialita', 'Utente', 'CartaSpecialita', 'CartaCompetenza', 'RegistrazioneCartaSpecialitaService', '$mdDialog', '$firebaseStorage', '$location',
    function ($scope, $rootScope, Specialita, Utente, CartaSpecialita, CartaCompetenza, RegistrazioneCartaSpecialitaService, $mdDialog, $firebaseStorage, $location) {
        $scope.dati = {};
        $scope.dati.specialita = Specialita.getData();
        $scope.dati.utente = Utente.getData();
        $scope.status = '  ';
        $scope.customFullscreen = false


        $scope.dati.correlate = "";
        var elenco = "";
        $scope.dati.carteComp = CartaCompetenza.getData();
        $scope.dati.carteComp.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.carteComp.length; i++) {
                if ($scope.dati.carteComp[i].ragazzo == $rootScope.info.user.codice) {
                    if (elenco == '') {
                        elenco = $scope.dati.carteComp[i].elenco_spec_collegate;
                    }
                    else {
                        elenco = elenco + ", " + $scope.dati.carteComp[i].elenco_spec_collegate;
                        //console.log("duplicati: " + elenco);
                    }
                }
            }
            var senzaDuplicati = elenco.split(', ').filter(function (item, i, allItems) {
                return i == allItems.indexOf(item);
            }).sort().join(', ');

            $scope.dati.correlate = senzaDuplicati;

        });


        $scope.dati.escludi = "";
        var elencoEscludi = "";
        $scope.dati.carte_specialita = CartaSpecialita.getData();
        $scope.dati.carte_specialita.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.carte_specialita.length; i++) {
                if ($scope.dati.carte_specialita[i].ragazzo == $rootScope.info.user.codice) {
                    if (elencoEscludi == '') {
                        elencoEscludi = $scope.dati.carte_specialita[i].nome;
                    }
                    else {
                        elencoEscludi = elencoEscludi + ", " + $scope.dati.carte_specialita[i].nome;
                        //console.log("duplicati: " + elenco);
                    }
                }
            }
            var specSenzaDuplicati = elencoEscludi.split(', ').filter(function (item, i, allItems) {
                return i == allItems.indexOf(item);
            }).sort().join(', ');

            $scope.dati.escludi = specSenzaDuplicati;

        });


        $scope.showAlert = function (ev, nome) {
            for (var i = 0; i < $scope.dati.specialita.length; i++) {
                if ($scope.dati.specialita[i].nome == nome) {
                    var descrizione = $scope.dati.specialita[i].descrizione;
                    var nomeSpec = $scope.dati.specialita[i].nome;
                    var spec = $scope.dati.specialita[i];

                }
            }

            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title(nomeSpec)
                    .textContent(descrizione)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Ho Capito!')
                    .targetEvent(ev)
            );
        };

        $scope.scegliSpecialita = function (nomeSpecialita) {
            $location.path("/sceltaMaestro/" + nomeSpecialita);
        };

    }]);

