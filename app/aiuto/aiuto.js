'use strict';

var app = angular.module('myAppAiuto', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/aiuto', {
        templateUrl: 'aiuto/aiuto.html',
        controller: 'aiutoCtrl',
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


app.controller('aiutoCtrl', ['$scope', '$rootScope', 'Utente', 'currentAuth', '$firebaseAuth', '$location', '$routeParams', '$window', function ($scope, $rootScope, Utente, currentAuth, $firebaseAuth, $location, $routeParams, $window) {

    $scope.dati = {};

    // function called when the "logout" button will be pressed
    $scope.apriChat = function () {

        var testo = "Ciao Stregatto, siamo " + $rootScope.info.user.componenti + " della squadra " + $rootScope.info.user.nome + ", abbiamo un problema, potresti aiutarci?";
        var testoEncoded = encodeURI(testo);
        var numero = "3341552927";

        $scope.dati.utenti = Utente.getData();
        $scope.dati.utenti.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.utenti.length; i++) {
                if ($scope.dati.utenti[i].numero != "" && $scope.dati.utenti[i].nome == "Stregatto" ) {
                    numero = $scope.dati.utenti[i].numero;
                }


            }
            var url = "https://api.whatsapp.com/send?phone=39" + numero + "&text=" + testoEncoded;
            $window.open(url);
        });



    };
}]);