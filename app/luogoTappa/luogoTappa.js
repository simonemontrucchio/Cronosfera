'use strict';

var app = angular.module('myAppLuogoTappa', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication'
]);


app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/luogoTappa/:codiceTappa', {
        templateUrl: 'luogoTappa/luogoTappa.html',
        controller: 'myAppLuogoTappaCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppLuogoTappaCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tappe', function ($scope, $rootScope, $routeParams, $location, Tappe) {
    //console.log("e' entrato nel ctrl fiamma database");


    //initialize variables
    $scope.dati = {};

    var codice = $routeParams.codiceTappa;
    $rootScope.info.tappaAttuale = Tappe.getTappeInfo(codice);

    $scope.ottieniEvento = function () {
        console.log("ho premuto su MOSTRA EVENTO");

        if ($scope.dati.luogo == $rootScope.info.tappaAttuale.luogo) {
            console.log("Il luogo è giusto");
            $location.path("/profilo/Simone");
        }
    };



}]);

