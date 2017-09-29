'use strict';

var app = angular.module('myAppImpossibili', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/impossibili', {
        templateUrl: 'impossibili/impossibili.html',
        controller: 'impossibiliCtrl',
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


app.controller('impossibiliCtrl', ['$scope', '$rootScope', 'ProposteService', 'currentAuth', '$firebaseAuth', '$location', '$routeParams', function ($scope, $rootScope, ProposteService, currentAuth, $firebaseAuth, $location, $routeParams) {

    //CARICO IL PROFILO CON I DATI DELL'UTENTE SELEZIONATO
    $scope.dati = {};

    console.log($scope.dati.impossibili);

    $scope.dati.proposte = ProposteService.getData();
    $scope.dati.proposte.$loaded().then(function () {
        $scope.dati.impossibili = false;
        for (var i = 0; i < $scope.dati.proposte.length; i++) {
            if ($scope.dati.proposte[i].squadra == $rootScope.info.user.nome) {
                $scope.dati.impossibili = true;
            }
        }
    });


}]);