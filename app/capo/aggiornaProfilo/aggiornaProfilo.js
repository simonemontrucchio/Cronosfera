'use strict';

var app = angular.module('myAppAggiornaProfiloCapo', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/aggiornaProfiloCapo/:codiceCapo', {
        templateUrl: 'capo/aggiornaProfilo/aggiornaProfilo.html',
        controller: 'aggiornaProfiloCapoCtrl',
        resolve: {
            // controller will not be loaded until $requireSignIn resolves
            // Auth refers to our $firebaseAuth wrapper in the factory below
            "currentAuth": ["Auth", function (Auth) {
                // $requireSignIn returns a promise so the resolve waits for it to complete
                // If the promise is rejected, it will throw a $routeChangeError (see above)
                return Auth.$requireSignIn();
            }]
        }
    })
}])

app.controller('aggiornaProfiloCapoCtrl', ['$scope', '$rootScope', 'RegistrazioneRagazzoService', 'Utente', '$firebaseAuth', '$location', '$routeParams', '$firebaseStorage', function ($scope, $rootScope, RegistrazioneRagazzoService, Utente, $firebaseAuth, $location, $routeParams, $firebaseStorage) {
    $scope.dati = {};
    $scope.dati.uploading = "";

    var ctrl = this;
    $scope.fileToUpload = null;
    $scope.imgPath = "";


    ctrl.onChange = function onChange(fileList) {
        $scope.fileToUpload = fileList[0];
        //console.log($scope.fileToUpload.name);
    };


    $scope.salvaFoto = function () {
        console.log("ho premuto su salva foto");


        if ($scope.fileToUpload != null) {
            $scope.dati.uploading = "Caricamento in corso...";

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


    $scope.aggiornaImmagineProfilo = function () {
        console.log("aggiorno la foto nel databse");
        RegistrazioneRagazzoService.aggiornaFoto($rootScope.info.user.$id, $scope.imgPath);
        $scope.dati.uploading = "";
    };


}]);

