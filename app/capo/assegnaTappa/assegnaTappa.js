'use strict';

var app = angular.module('myAppAssegnaTappa', [
    'ngMaterial',
    'ngRoute',
    'myAppSquadriglia'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/assegnaTappa', {
        templateUrl: 'capo/assegnaTappa/assegnaTappa.html',
        controller: 'myAppAssegnaTappaCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppAssegnaTappaCtrl', ['$scope', '$rootScope', 'Utente', function ($scope, $rootScope, Utente) {
    console.log("e' entrato nel ctrl assegna tappa");


    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    //get the list of available sq
    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {

        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {

                var uuid = $scope.dati.utenti[i].$id;
                var tappaOld = $scope.dati.utenti[i].tappa;
                console.log("All'inizio " + $scope.dati.utenti[i].nome + " ha la tappa " + tappaOld);
            }
        }
    });




    $scope.salvaTappe = function (params) {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            console.log("ENTRO NEL salva tappe");

            if ($scope.dati.utenti[i].ruolo == 'ragazzo') {
                var uuid = $scope.dati.utenti[i].$id;
                var newTappa = $scope.dati.utenti[i].tappa;
                console.log("Alla fine " + $scope.dati.utenti[i].nome + " ha la tappa " + newTappa);
                Utente.aggiornaTappa(uuid, newTappa);
            }
        }
        $scope.dati.feedback = "Salvataggio avvenuto con successo";
    };

}]);

