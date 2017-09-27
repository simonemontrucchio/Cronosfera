'use strict';

var app = angular.module('myAppProposta', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/proposta/:codiceTappa', {
        templateUrl: 'proposta/proposta.html',
        controller: 'propostaCtrl',
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

app.controller('propostaCtrl', ['$scope', '$rootScope', 'Utente', '$firebaseAuth', '$location', '$routeParams', '$firebaseStorage', 'Tappe', 'ProposteService', function ($scope, $rootScope, Utente, $firebaseAuth, $location, $routeParams, $firebaseStorage, Tappe, ProposteService) {
    $scope.dati = {};
    $scope.dati.feedback = "";
    $scope.dati.error = "";

    $scope.dati.prossima = false;

    $scope.dati.invio = false;

    var codice = $routeParams.codiceTappa;
    $rootScope.info.tappaAttuale = Tappe.getTappeInfo(codice);



    $scope.proponiCambiamento=function(){
        console.log("ho premuto su PROPONI CAMBIAMENTO");

        if ($scope.dati.proposta!= undefined && $scope.dati.proposta!="") {

            ProposteService.aggiungiProposta(codice, $rootScope.info.user.nome, $scope.dati.proposta).then(function(ref) {

                console.log("uscito dal factory aggiungi proposta");

                var propostaId = ref.key
                console.log("Questo è il uuid della proposta: "+ propostaId);

                $scope.dati.feedback = "Proposta avvenuta con successo";

                $scope.dati.prossima = true;

                $scope.dati.invio = true;

                var next = $rootScope.info.tappaAttuale.next;
                console.log("La prossima tappa sarà la: " + next);
                $rootScope.info.tappaProssima = Tappe.getTappeInfo(next);

                $rootScope.info.tappaProssima.$loaded().then(function () {
                    var prossimaData =  $rootScope.info.tappaProssima.data;
                    console.log("La prossima data sarà: " + prossimaData) ;

                    $rootScope.info.prossimaData = prossimaData;
                });


            });
        }

    };


    $scope.cronosfera = function () {
        console.log("ho premuto su VAI");
        console.log("Dopo la proposta, nel rootscope c'è: " + $rootScope.info.prossimaData)
        $location.path("/home");
    };




}]);

