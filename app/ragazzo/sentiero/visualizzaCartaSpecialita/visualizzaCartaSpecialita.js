'use strict';

var app = angular.module('myAppVisualizzaCartaSpecialita', ['ngMaterial', 'ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/visualizzaCartaSpecialita/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/visualizzaCartaSpecialita/visualizzaCartaSpecialita.html',
        controller: 'myAppVisualizzaCartaSpecialita'
    })
}])

app.controller('myAppVisualizzaCartaSpecialita', ['$scope', '$rootScope', '$routeParams', 'Scadenza', '$location', 'CartaSpecialita', 'Utente', 'CartaCompetenza', function ($scope, $rootScope, $routeParams, Scadenza, $location, CartaSpecialita, Utente, CartaCompetenza) {
    $scope.dati = {}
    $scope.dati.carteSpec = CartaSpecialita.getData();
    $scope.dati.carteComp = CartaCompetenza.getData();

    console.log("" + $routeParams.cartaSpecialitaId)

    $scope.dati.utente = Utente.getData()
    $scope.dati.carteSpec.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.carteSpec.length; i++) {
            if ($scope.dati.carteSpec[i].$id == $routeParams.cartaSpecialitaId) {
                $scope.dati.cartaSpec = CartaSpecialita.getCartaInfo($scope.dati.carteSpec[i].$id);
                console.log("" + $scope.dati.carteSpec[i].maestro)
                for (var j = 0; j < $scope.dati.utente.length; j++) {
                    if ($scope.dati.utente[j].codice == $scope.dati.carteSpec[i].maestro) {
                        console.log("ci siamo quasi" + $scope.dati.utente[j].nome)
                        $scope.dati.maestro = Utente.getUserInfo($scope.dati.utente[j].$id)
                    }
                }
            }
        }
    })


    $scope.dati.valoreIdCarta = $routeParams.cartaSpecialitaId
    $scope.dati.scadenze = Scadenza.getData()


    /**** FUNZIONE PER ASSEGNARE CLASSI PERSONALIZZATE ****/
    $scope.personalizzaBox = function (deadline, conferma) {
        if (conferma == true) {
            return "border-scadenza border-scadenza-confermata";

        } else if (conferma == false && deadline < 0) {
            return "border-scadenza border-scadenza-mancata";
        }

        else {
            return "border-scadenza";
        }
    };


}])


/**** FILTRO CREATO CUSTOM PER ordinare deadline negative ****/
app.filter('stringToInteger', function () {
    return function (input) {
        angular.forEach(input, function (value) {
            value.deadline = parseInt(value.deadline);
        })
        return input;
    };
});