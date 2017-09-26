'use strict';

var app = angular.module('myAppHome', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento',
    'myAppAuthentication',
    'myAppUtente',
    'myAppSpecialita'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'myAppHomeCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppHomeCtrl', ['$scope', '$rootScope', 'Evento', '$firebaseAuth', '$location', 'Utente', 'Scadenza', 'Specialita', function ($scope, $rootScope, Evento, $firebaseAuth, $location, Utente, Scadenza, Specialita) {

    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();
    $scope.dati.specialita = Specialita.getData();
    $scope.dati.eventi = Evento.getData();



}]);
