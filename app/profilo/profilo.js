'use strict';

var app = angular.module('myAppProfilo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/profilo/:nomeSquadra', {
        templateUrl: 'profilo/profilo.html',
        controller: 'profiloCtrl',
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


app.controller('profiloCtrl', ['$scope', '$rootScope', 'Utente', 'currentAuth', '$firebaseAuth', '$location', '$routeParams', function ($scope, $rootScope, Utente, currentAuth, $firebaseAuth, $location, $routeParams) {



    //CARICO IL PROFILO CON I DATI DELL'UTENTE SELEZIONATO
    $scope.dati = {};
    var uuidProfilo = "";

    $scope.dati.utenti = Utente.getData();
    $scope.dati.utenti.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.utenti.length; i++) {
            if ($scope.dati.utenti[i].nome == $routeParams.nomeSquadra) {
                $scope.dati.user = Utente.getUserInfo($scope.dati.utenti[i].$id);
            }
        }
    });


    // function called when the "logout" button will be pressed
    $scope.logout = function () {

        //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
        Utente.registerLogout(currentAuth.uid);
        //sign out
        $firebaseAuth().$signOut();
        console.log("logout avvenuto");

        $rootScope.info.info = false;
        console.log("Nel Logout setto info a false, e vale: " + $rootScope.info.info);

        $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                console.log("L'utente e' già loggato con l'id:  ", firebaseUser.uid);
            } else {
                $location.path("/login");
            }
        });
    };
}]);