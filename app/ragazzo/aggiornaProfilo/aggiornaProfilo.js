'use strict';

var app = angular.module('myAppAggiornaProfiloRagazzo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/aggiornaProfiloRagazzo/:codiceRagazzo', {
        templateUrl: 'ragazzo/aggiornaProfilo/aggiornaProfilo.html',
        controller: 'aggiornaProfiloRagazzoCtrl',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function(Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $routeChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    })
}])

app.controller('aggiornaProfiloRagazzoCtrl', ['$scope', '$rootScope', 'RegistrazioneRagazzoService', 'Utente', '$firebaseAuth', '$location', '$routeParams', '$firebaseStorage', function($scope, $rootScope, RegistrazioneRagazzoService, Utente,$firebaseAuth, $location, $routeParams,$firebaseStorage) {
    $scope.dati={};
    $scope.dati.descrizione = "";
    $scope.dati.hobby = "";
    $scope.dati.descrizione = $rootScope.info.user.descrizione;
    $scope.dati.hobby = $rootScope.info.user.hobby;
    $scope.dati.uploading = "";

    var ctrl = this;
    $scope.fileToUpload=null;
    $scope.imgPath="";



    $scope.salvaBio=function(){
        console.log("ho premuto su salva bio");
        RegistrazioneRagazzoService.aggiornaBio($rootScope.info.user.$id, $scope.dati.descrizione, $scope.dati.hobby);
        $scope.dati.feedback = "Salvataggio avvenuto con successo";

    };

    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
        //console.log($scope.fileToUpload.name);
    };


    $scope.salvaFoto= function() {
        console.log("ho premuto su salva foto");


        if ($scope.fileToUpload != null) {
            $scope.dati.uploading="Caricamento in corso...";

            var fileName = $scope.fileToUpload.name;
            var storageRef = firebase.storage().ref("fotoProfilo/" + fileName);
            console.log("Sono dentro l'immissione di una foto")
            $scope.storage = $firebaseStorage(storageRef);
            var uploadTask = $scope.storage.$put($scope.fileToUpload);
            uploadTask.$complete(function (snapshot) {
                $scope.imgPath = snapshot.downloadURL;
                $scope.aggiornaImmagineProfilo();
            });
        }
    };


    $scope.aggiornaImmagineProfilo=function(){
        console.log("aggiorno la foto nel databse");
        RegistrazioneRagazzoService.aggiornaFoto($rootScope.info.user.$id, $scope.imgPath);
        $scope.dati.uploading="";
    };

    $scope.salvaImpegni= function() {
        console.log("ho premuto su salva impegni");


        if ($scope.fileToUpload != null) {
            $scope.dati.uploading="Caricamento in corso...";

            var fileName = $scope.fileToUpload.name;
            var storageRef = firebase.storage().ref("fotoImpegni/" + fileName);
            console.log("Sono dentro l'immissione di una foto")
            $scope.storage = $firebaseStorage(storageRef);
            var uploadTask = $scope.storage.$put($scope.fileToUpload);
            uploadTask.$complete(function (snapshot) {
                $scope.imgPath = snapshot.downloadURL;
                $scope.aggiornaImmagineImpegni();
            });
        }
    };


    $scope.aggiornaImmagineImpegni=function(){
        console.log("aggiorno la foto nel databse");
        RegistrazioneRagazzoService.aggiornaImpegni($rootScope.info.user.$id, $scope.imgPath);
        $scope.dati.uploading="";
    };

}]);

