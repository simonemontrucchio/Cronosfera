'use strict';

var app = angular.module('myAppRiepilogoScadenze', [
    'ngMaterial',
    'ngRoute',
    'myAppUtente',
    'myAppSpecialita'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/riepilogoScadenze', {
        templateUrl: 'capo/riepilogoScadenze/riepilogoScadenze.html',
        controller: 'myAppRiepilogoScadenzeCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppRiepilogoScadenzeCtrl', ['$scope', '$rootScope', 'Utente', 'Scadenza', '$mdDialog', function ($scope, $rootScope, Utente, Scadenza, $mdDialog) {
    console.log("e' entrato nel ctrl riepilogo scadenze");


    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();


    /**** FUNZIONE PER ASSEGNARE CLASSI PERSONALIZZATE ****/
    $scope.personalizzaBox = function (deadline, conferma) {
        if (conferma == true) {
            return "box-scadenza scadenza-confermata";

        } else if (conferma == false && deadline < 0) {
            return "box-scadenza scadenza-mancata";
        }

        else {
            return "box-scadenza";
        }
    };


    $scope.customFullscreen = false

    $scope.showAlert = function (ev, azione, ragazzo, specialita, deadline, conferma) {
        //console.log('clicco sul bottone dialog')

        $scope.dati.deadline = deadline;
        if (deadline < 0) {
            $scope.dati.deadline = ("" + deadline).replace("-", "");
            //$scope.dati.deadline = (!!deadline) ?  deadline.substr(1) : '';
        }


        $scope.dati.verbo = "doveva:";
        $scope.dati.quando = $scope.dati.deadline + " giorni fa";
        $scope.dati.button = "SOLLECITA";
        if (deadline >= 0) {
            $scope.dati.verbo = "deve:";
            $scope.dati.quando = "tra " + $scope.dati.deadline + " giorni";
        }
        if (conferma == true) {
            $scope.dati.verbo = "ha portato a termine:";
            $scope.dati.button = "CONGRATULATI";
        }


        $mdDialog.show(
            $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title("Specialità di " + specialita)
                .textContent(ragazzo + " " + $scope.dati.verbo + " " + azione + ". (" + $scope.dati.quando + ").")
                .ariaLabel('Alert Dialog Scadenza')
                .ok($scope.dati.button)
                .targetEvent(ev)
        );

    };

}]);


/**** FILTRO CREATO CUSTOM PER RIMUOVERE IL "meno" DAVANTI AL NUMERO ****/
app.filter('removeDash', function () {
    return function (input) {
        return ("" + input).replace("-", "");
    }
});

/**** FILTRO CREATO CUSTOM PER ordinare deadline negative ****/
app.filter('stringToInteger', function () {
    return function (input) {
        angular.forEach(input, function (value) {
            value.deadline = parseInt(value.deadline);
        })
        return input;
    };
});