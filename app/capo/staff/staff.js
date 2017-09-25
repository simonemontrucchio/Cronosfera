'use strict';

var app = angular.module('myAppStaff', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/staff', {
        templateUrl: 'capo/staff/staff.html',
        controller: 'myAppStaffCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppStaffCtrl', ['$scope', '$rootScope', 'Utente', function ($scope, $rootScope, Utente) {
    console.log("e' entrato nel ctrl staff");


    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";
    $scope.modulo = {};
    $scope.modulo.ricerca = "";
    console.log("All'inizio il codice ricerca e': " + $scope.modulo.ricerca);
    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].ruolo == 'capo') {

                var uuid = $scope.dati.utenti[i].$id;
                var checkedOld = $scope.dati.utenti[i].staff;
                //console.log("All'inizio " + $scope.dati.utenti[i].nome + " ha il toggle " + checkedOld);
            }
        }
    });


    $scope.salvaStaff = function (params) {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            console.log("ENTRO NEL salva staff");

            if ($scope.dati.utenti[i].ruolo == 'capo') {
                var uuid = $scope.dati.utenti[i].$id;
                var codiceCicloi = $scope.dati.utenti[i].codice;
                var switchCicloi = document.getElementById(codiceCicloi);
                var checked = switchCicloi.getAttribute("aria-checked");
                console.log("Alla fine " + $scope.dati.utenti[i].nome + " ha il toggle " + checked);


                Utente.aggiornaStaff(uuid, checked);


            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";

    };


}]);

