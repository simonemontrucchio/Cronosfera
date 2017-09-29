'use strict';

var app = angular.module('myAppImpossibiliStregatto', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/impossibiliStregatto', {
        templateUrl: 'impossibiliStregatto/impossibiliStregatto.html',
        controller: 'impossibiliStregattoCtrl',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $routeChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    })
}])


app.controller('impossibiliStregattoCtrl', ['$scope', '$rootScope', 'ProposteService', 'currentAuth', '$firebaseAuth', '$location', '$routeParams', function ($scope, $rootScope, ProposteService, currentAuth, $firebaseAuth, $location, $routeParams) {



    //CARICO IL PROFILO CON I DATI DELL'UTENTE SELEZIONATO
    $scope.dati = {};

    $scope.dati.proposte = ProposteService.getData();


}]);