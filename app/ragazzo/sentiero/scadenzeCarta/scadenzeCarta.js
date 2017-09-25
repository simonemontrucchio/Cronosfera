'use strict';

var app = angular.module('myAppScadenzeCarta', [
    'ngMaterial',
    'ngRoute'

])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/scadenzeCarta/:cartaSpecialitaId', {
        templateUrl: 'ragazzo/sentiero/scadenzeCarta/scadenzeCarta.html',
        controller: 'myAppScadenzeCartaCtrl'
    })
}]);

app.controller('myAppScadenzeCartaCtrl', ['$scope', '$rootScope', '$routeParams', 'Scadenza', '$location', 'CartaSpecialita', function ($scope, $rootScope, $routeParams, Scadenza, $location, CartaSpecialita) {
    $scope.dati = {};
    $scope.dati.salvataggio = 0;
    $scope.status = '  ';
    $scope.dati.carteSpec = CartaSpecialita.getData();
    $scope.customFullscreen = false
    $scope.dati.myDate1 = new Date()
    $scope.dati.myDate2 = new Date()
    $scope.dati.myDate3 = new Date()
    $scope.dati.myDate4 = new Date()
    $scope.dati.today = new Date()
    var oneDay = 24 * 60 * 60 * 1000;	// hours*minutes*seconds*milliseconds

    $scope.dati.carteSpec.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.carteSpec.length; i++) {
            console.log("sono nel for di aggiungi azione e scadenza")
            console.log("" + $scope.dati.carteSpec[i].$id)
            if ($scope.dati.carteSpec[i].$id == $routeParams.cartaSpecialitaId) {
                console.log("sono nel if di aggiungi azione e scadenza ")
                $scope.dati.nomeSpec = CartaSpecialita.getCartaInfo($scope.dati.carteSpec[i].$id);
                console.log("" + $scope.dati.nomeSpec.nome)
            }
        }
    })

    $scope.dati.nomeRagazzo = $rootScope.info.user
    $scope.dati.deadline = Math.floor((Math.random() * 50));
    console.log("" + $scope.dati.deadline)


    $scope.salvaScadenze = function () {

        if ($scope.dati.salvataggio == 0) {

            $scope.dati.feedback = "";
            $scope.dati.error = "";
            $scope.dati.salvataggio = 1;

            console.log("ho premuto su salva");

            if ($scope.dati.azione1 != undefined && $scope.dati.azione1 != "" && $scope.dati.myDate1 != $scope.dati.today) {
                var data = new Date($scope.dati.myDate1.getFullYear(), $scope.dati.myDate1.getMonth(), $scope.dati.myDate1.getDate());
                var oggi = new Date($scope.dati.today.getFullYear(), $scope.dati.today.getMonth(), $scope.dati.today.getDate());
                var deadline = Math.abs((data.getTime() - oggi.getTime()) / (oneDay));
                $scope.registraScadenza($scope.dati.azione1, $scope.dati.myDate1, deadline);
            }
            if ($scope.dati.azione2 != undefined && $scope.dati.azione2 != "" && $scope.dati.myDate2 != $scope.dati.today) {
                var data = new Date($scope.dati.myDate2.getFullYear(), $scope.dati.myDate2.getMonth(), $scope.dati.myDate2.getDate());
                var oggi = new Date($scope.dati.today.getFullYear(), $scope.dati.today.getMonth(), $scope.dati.today.getDate());
                var deadline = Math.abs((data.getTime() - oggi.getTime()) / (oneDay));
                $scope.registraScadenza($scope.dati.azione2, $scope.dati.myDate2, deadline);
            }
            if ($scope.dati.azione3 != undefined && $scope.dati.azione3 != "" && $scope.dati.myDate3 != $scope.dati.today) {
                var data = new Date($scope.dati.myDate3.getFullYear(), $scope.dati.myDate3.getMonth(), $scope.dati.myDate3.getDate());
                var oggi = new Date($scope.dati.today.getFullYear(), $scope.dati.today.getMonth(), $scope.dati.today.getDate());
                var deadline = Math.abs((data.getTime() - oggi.getTime()) / (oneDay));
                $scope.registraScadenza($scope.dati.azione3, $scope.dati.myDate3, deadline);
            }
            if ($scope.dati.azione4 != undefined && $scope.dati.azione4 != "" && $scope.dati.myDate4 != $scope.dati.today) {
                var data = new Date($scope.dati.myDate4.getFullYear(), $scope.dati.myDate4.getMonth(), $scope.dati.myDate4.getDate());
                var oggi = new Date($scope.dati.today.getFullYear(), $scope.dati.today.getMonth(), $scope.dati.today.getDate());
                var deadline = Math.abs((data.getTime() - oggi.getTime()) / (oneDay));
                $scope.registraScadenza($scope.dati.azione4, $scope.dati.myDate4, deadline);
            }

            $location.path("/visualizzaCartaSpecialita/" + $routeParams.cartaSpecialitaId);
            $scope.dati.feedback = "Registrazione avvenuta con successo";
            $scope.dati.salvataggio = 0;

        }
    }

    $scope.registraScadenza = function (azione, data, deadline) {
        //console.log("vediamo cosa c'è:" + azione + " "+ $rootScope.info.cartaSpec.$id+ " "+data+ " "+$scope.dati.deadline+ $rootScope.info.user.nome+ " "+$rootScope.info.cartaSpec.nome_specialita+ " "+$rootScope.info.user.codice+" "+$rootScope.info.cartaSpec.specialita)

        Scadenza.creaScadenza(azione, $rootScope.info.cartaSpec.$id, data, deadline, $rootScope.info.user.nome, $rootScope.info.cartaSpec.nome, $rootScope.info.user.codice, $rootScope.info.cartaSpec.specialita)
        console.log("Salvataggio avvenuto con successo")
    }
}])