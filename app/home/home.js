'use strict';

var app = angular.module('myAppHome', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento',
    'myAppAuthentication',
    'myAppUtente',
    'myAppSpecialita'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'myAppHomeCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppHomeCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$location','Tappe', 'Utente', function ($scope, $rootScope, $firebaseAuth, $location, Tappe, Utente) {

    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    $scope.dati.tappe = Tappe.getData();


    $scope.dati.squadre = Utente.getData();
    $scope.dati.squadre.$loaded().then(function () {
        for (var i = 0; i < $scope.dati.squadre.length; i++) {
            if ($scope.dati.squadre[i].nome == $rootScope.info.user.nome) {
                if ($scope.dati.squadre[i].prossimaData != "dd/mm/yyyy" && $scope.dati.squadre[i].prossimaData != ""){
                    $scope.dati.data = $scope.dati.squadre[i].prossimaData;
                }
            }
        }
    });






    $scope.ottieniGPS = function () {
        console.log("ho premuto su VAI");
        $scope.dati.tappe.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.tappe.length; i++) {
                console.log("Sono nel for alla tappa: " + $scope.dati.tappe[i].$id);
                if ($scope.dati.tappe[i].data == $scope.dati.data) {
                    console.log("Chiedo le coordinate per la tappa: " + $scope.dati.tappe[i].$id);
                    $location.path("/luogoTappa/" + $scope.dati.tappe[i].$id);
                }
            }
        });
    };





}]);
