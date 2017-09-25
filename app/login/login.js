'use strict';

var app = angular.module('myAppLogin', [
    'ngMaterial',
    'ngMessages',
    'ngRoute',
    'myAppUtente'
])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/login', {
        templateUrl: 'login/login.html',
        controller: 'LoginCtrl'
    });
}]);


app.controller('LoginCtrl', ['$scope', '$rootScope', 'Auth', '$location', '$log', 'Utente', '$firebaseAuth', function ($scope, $rootScope, Auth, $location, $log, Utente, $firebaseAuth) {

    $scope.isLogged = function () {
        if ($firebaseAuth().$getAuth())
            return true;
        else
            return false;
    };


    // function called when the "logout" button will be pressed
    $scope.logout = function () {

        //save the new status in the database (we do it before the actual logout because we can write in the database only if the user is logged in)
        Utente.registerLogout($firebaseAuth().$getAuth().uid);
        //sign out
        $firebaseAuth().$signOut();
        console.log("logout avvenuto");

        $rootScope.info.info = false;
        console.log("Nel Logout setto info a false, e vale: " + $rootScope.info.info);

        $firebaseAuth().$onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                console.log("L'utente e' già loggato con l'id: ", firebaseUser.uid);
            } else {
                $location.path("/login");
            }
        });
    };


    $scope.user = {};
    $scope.auth = Auth; //acquires authentication from app.js (if it was done)

    //this function will be called when the "Login" button will be pressed
    $scope.signIn = function () {
        //initialize variables
        $scope.firebaseUser = null;
        $scope.error = null;
        //set the variable that is used in the main template to show the active button

        $scope.auth.$signInWithEmailAndPassword($scope.user.email, $scope.user.password).then(function (firebaseUser) {
            var userId = firebaseUser.uid;
            Utente.registerLogin(userId, $scope.user.email);

            $rootScope.info.info = false;
            console.log("Nel Login setto info a false, e vale: " + $rootScope.info.info);

            // login successful: redirect
            $location.path("/homeCapo");

            console.log("Login avvenuto. Fatto da: " + userId);

        }).catch(function (error) {
            $scope.error = error;
            $log.error(error.message);
        });
    };
}]);