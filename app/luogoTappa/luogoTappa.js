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


app.controller('myAppLuogoTappaCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tappe', '$window', function ($scope, $rootScope, $routeParams, $location, Tappe, $window) {
    //console.log("e' entrato nel ctrl fiamma database");


    //initialize variables
    $scope.dati = {};
    $scope.dati.evento = false;

    var codice = $routeParams.codiceTappa;
    $rootScope.info.tappaAttuale = Tappe.getTappeInfo(codice);




    $scope.ottieniEvento = function () {
        console.log("ho premuto su MOSTRA EVENTO");

        if ($scope.dati.luogo == $rootScope.info.tappaAttuale.luogo) {
            console.log("Il luogo è giusto");
            $scope.dati.evento = true;

        }
    };

    $scope.aneddoto = function () {

        var url = $rootScope.info.tappaAttuale.url;
        console.log("Apro link aneddoto: " + url);
        $window.open(url);
    };


    $scope.proposta = function () {
        console.log("ho premuto su PROPOSTA");
        $location.path("/proposta/" + codice);
    };


}]);

