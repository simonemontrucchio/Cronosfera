'use strict';

var app = angular.module('myAppHomeCapo', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento',
    'myAppAuthentication',
    'myAppUtente',
    'myAppSpecialita'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/homeCapo', {
        templateUrl: 'capo/homeCapo/homeCapo.html',
        controller: 'myAppHomeCapoCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppHomeCapoCtrl', ['$scope', '$rootScope', 'Evento', '$firebaseAuth', '$location', 'Utente', 'Scadenza', 'Specialita', function ($scope, $rootScope, Evento, $firebaseAuth, $location, Utente, Scadenza, Specialita) {

    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();
    $scope.dati.specialita = Specialita.getData();
    $scope.dati.eventi = Evento.getData();


    $scope.isLogged = function () {
        if ($firebaseAuth().$getAuth()) {
            if ($rootScope.info.user.ruolo == 'ragazzo') {
                //REDIRECT SU HOME RAGAZZO SE SI E' LOGGATO UN RAGAZZO
                $location.path("/homeRagazzo");
            }
            return true;
        }
        else
            return false;
    }

}]);
