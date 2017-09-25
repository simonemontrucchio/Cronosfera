'use strict';

var app = angular.module('myAppRegistration', ['ngMaterial', 'ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/registrationView', {
        templateUrl: 'registrationView/registrationView.html',
        controller: 'myAppRegistrationViewCtrl'
    });
}]);

app.controller('myAppRegistrationViewCtrl', ['$scope', '$rootScope', 'Auth', 'Utente', '$location', '$firebaseAuth', function ($scope, $rootScope, Auth, Utente, $location, $firebaseAuth) {

    console.log('registration view controller');

    $scope.user = {};
    $scope.dati = {};


    $scope.signUp = function () {
        console.log("Entra nella function signUp");
        $scope.dati.feedback = "";
        $scope.dati.error = "";

        //check if the second password is equal to the first one
        if ($scope.user.password != '' && $scope.user.password === $scope.user.password2) {

            //CONTROLLO CHE L'UTENTE NON ESISTA GIA'
            console.log("metto esistente su false");
            var esistente = false;
            $scope.control = {};
            $scope.control.utenti = Utente.getData();
            $scope.control.utenti.$loaded().then(function () {
                for (var i = 0; i < $scope.control.utenti.length; i++) {
                    console.log("avvio il for per controllare utente esistenti");
                    if ($scope.control.utenti[i].ruolo == 'capo' && $scope.control.utenti[i].codice == $scope.user.codice) {
                        $scope.dati.error = "UTENTE GIA' ESISTENTE!";
                        esistente = true;
                        console.log("metto esistente su true");
                    }
                }
                if (esistente == false) {
                    console.log("esistente vale false, registro");
                    //create a new user with specified email and password
                    Auth.$createUserWithEmailAndPassword($scope.user.email, $scope.user.password)
                        .then(function (firebaseUser) {
                            //after creating the user, we will perform a login and then the new information will be saved in the database
                            //(the reason is that we cannot write in the database if we are not logged in ... it is not the best way of doing it but it is ok for our prototype)
                            Auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (internalFirebaseUser) {
                                var userId = internalFirebaseUser.uid;
                                Utente.registerNewUserInfo(userId, $scope.user.nome, $scope.user.cognome, $scope.user.email, $scope.user.codice);

                                console.log("Registrazione avvenuta con successo");
                                $scope.dati.error = "Registrazione avvenuta con successo";

                                Utente.registerLogin(userId, $scope.user.email);


                                //PRIMA DI REINDIRIZZARE SULLA HOME, CARICO I DATI DEL LOGGATO NEL ROOTSCOPE
                                $rootScope.info.info = true;
                                console.log("Nel InfoUserLogged setto info a true, e vale: " + $rootScope.info.info);
                                $rootScope.info = {};
                                $rootScope.info.user = Utente.getUserInfo($firebaseAuth().$getAuth().uid);


                                console.log("Login avvenuto con successo, redirect su homeCapo");
                                // login successful: redirect to
                                $location.path("/homeCapo");

                            }).catch(function (error) {
                                $scope.error = error;
                                console.log(error.message);
                            });
                        }).catch(function (error) {
                        $scope.error = error;
                        console.log(error.message);
                    });
                }
            });
        }
        else {
            $scope.dati.error = "Password diverse";
        }
    };
}]);