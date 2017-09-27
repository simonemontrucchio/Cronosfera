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


app.controller('myAppHomeCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$location','Tappe',function ($scope, $rootScope, $firebaseAuth, $location, Tappe) {

    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    $scope.dati.tappe = Tappe.getData();

    console.log("Prossima data: " + $rootScope.info.prossimaData);

    if ($rootScope.info.prossimaData != undefined && $rootScope.info.prossimaData != "dd/mm/yyyy"){
        $scope.dati.data = $rootScope.info.prossimaData;
    }






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
