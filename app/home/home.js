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


app.controller('myAppHomeCtrl', ['$scope', '$rootScope', '$firebaseAuth', '$location', '$routeParams',function ($scope, $rootScope, $firebaseAuth, $location, $routeParams) {

    //initialize variables
    $scope.dati = {};
    $scope.dati.feedback = "";

    if ($rootScope.info.prossimaData!= undefined && $rootScope.info.prossimaData!=""){
        $scope.dati.data = $rootScope.info.prossimaData;
    }





    $scope.ottieniGPS = function () {
        console.log("ho premuto su VAI");


        if ($scope.dati.data == "11/09/2001") {
            console.log("11 settembre");
            $location.path("/luogoTappa/001");
        }
    };





}]);
