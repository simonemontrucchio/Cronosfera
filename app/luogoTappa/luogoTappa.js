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


app.controller('myAppLuogoTappaCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'Tappe', '$window', 'ProposteService', 'Utente', function ($scope, $rootScope, $routeParams, $location, Tappe, $window, ProposteService, Utente) {
    //console.log("e' entrato nel ctrl fiamma database");


    //initialize variables
    $scope.dati = {};
    $scope.dati.evento = false;


    var codice = $routeParams.codiceTappa;
    $rootScope.info.tappaAttuale = Tappe.getTappeInfo(codice);




    var proposteTappa = 0;
    var numeroSquadre = 0;
    console.log("Proposte azzerato: " + proposteTappa);

    $scope.dati.proposte = ProposteService.getData();
    $scope.dati.proposte.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.proposte.length; i++) {
            if ($scope.dati.proposte[i].tappa == codice) {
                proposteTappa++;
                console.log("Proposte trovate: " + proposteTappa);
            }
        }

        $scope.dati.utenti = Utente.getData();
        $scope.dati.utenti.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.utenti.length; i++) {
                if ($scope.dati.utenti[i].nome != "Stregatto" ) {
                    numeroSquadre++;

                }
            }
            console.log("Squadre trovate: " + numeroSquadre);
            numeroSquadre--;
            $scope.dati.ultimi = false;
            console.log("ultimi: " + $scope.dati.ultimi);
            if (proposteTappa == numeroSquadre){
                $scope.dati.ultimi = true;
                console.log("ultimi: " + $scope.dati.ultimi);
                console.log("Siete gli ultimi");
            }
        });
    });








    $scope.navigatore = function () {
        var coordinate = encodeURI($rootScope.info.tappaAttuale.coordinate);
        var url = "https://www.google.com/maps/dir/?api=1&destination=" + coordinate + "&dir_action=navigate";
        $window.open(url);
    };


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

