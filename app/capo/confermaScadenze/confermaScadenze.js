'use strict';

var app = angular.module('myAppConfermaScadenze', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente',
    'myAppSpecialita'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/confermaScadenze', {
        templateUrl: 'capo/confermaScadenze/confermaScadenze.html',
        controller: 'myAppConfermaScadenzeCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppConfermaScadenzeCtrl', ['$scope', '$rootScope', 'Utente', 'Scadenza', 'Specialita', function ($scope, $rootScope, Utente, Scadenza, Specialita) {
    console.log("e' entrato nel ctrl conferma scadenze");


    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();
    $scope.dati.specialita = Specialita.getData();

    $scope.dati.scadenze.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.scadenze.length; i++) {
            if ($scope.dati.scadenze[i].conferma == false && $scope.dati.scadenze[i].deadline <= 0) {

                var checkedOld = $scope.dati.scadenze[i].conferma;
                console.log("All'inizio " + $scope.dati.scadenze[i].azione + " ha il toggle " + checkedOld);

                $scope.dati.scadenze[i].uid = $scope.dati.scadenze[i].$id;
            }
        }
    });


    $scope.salvaScadenze = function (params) {
        for (var i = 0; i < $scope.dati.scadenze.length; i++) {
            console.log("ENTRO NEL salva scadenze");

            if ($scope.dati.scadenze[i].conferma == false && $scope.dati.scadenze[i].deadline <= 0) {
                console.log("Trovo una scadenza non confermata e con deadline minore di 0");

                var uuid = $scope.dati.scadenze[i].$id;
                var switchCicloi = document.getElementById(uuid);
                var checked = switchCicloi.getAttribute("aria-checked");

                console.log("Alla fine " + $scope.dati.scadenze[i].azione + " ha il toggle " + checked);

                Scadenza.aggiornaScadenze(uuid, checked);
            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";
    };

}]);


/**** FILTRO CREATO CUSTOM PER RIMUOVERE IL "meno" DAVANTI AL NUMERO ****/
app.filter('removeDash', function () {
    return function (input) {
        return ("" + input).replace("-", "");
    }
});