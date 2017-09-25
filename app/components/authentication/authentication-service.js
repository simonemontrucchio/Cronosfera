'use strict';

//This module implement the service that handle the $firebaseAuth
angular.module('myAppAuthenticationService', [])

    .factory('Auth', ["$firebaseAuth", function ($firebaseAuth) {
        return $firebaseAuth();
    }]);