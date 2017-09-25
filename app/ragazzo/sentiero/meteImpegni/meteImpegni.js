'use strict';

var app = angular.module('myAppMeteImpegni', [
    'ngMaterial',
    'ngRoute',
    'myAppAuthentication',
    'myAppUtente',
    'myAppMete',
    'myAppImpegni'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/meteImpegni/:codiceRagazzo', {
        templateUrl: 'ragazzo/sentiero/meteImpegni/meteImpegni.html',
        controller: 'myAppMeteImpegniCtr',
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

app.controller('myAppMeteImpegniCtr', ['$scope', '$rootScope', 'Utente', 'Mete', 'Impegni', 'currentAuth', '$firebaseAuth', '$location', '$routeParams',
    function ($scope, $rootScope, Utente, Mete, Impegni, currentAuth, $firebaseAuth, $location, $routeParams) {

        $scope.dati = {}
        $scope.dati.mete = Mete.getData();
        $scope.dati.impegni = Impegni.getData();

        $scope.dati.meta = {};
        $scope.dati.impegno1 = {};
        $scope.dati.impegno2 = {};
        $scope.dati.impegno3 = {};
        var count = 0;

        console.log("inizializzo tutto");

        $scope.dati.mete.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.mete.length; i++) {
                console.log("inizio a cercare le mete");
                console.log("mete i codice: " + $scope.dati.mete[i].codice);
                console.log("mete i tappa: " + $scope.dati.mete[i].tappa);
                console.log("mete i tappa: " + $scope.dati.mete[i].azione);

                if ($scope.dati.mete[i].codice == $rootScope.info.user.codice && $scope.dati.mete[i].tappa == $rootScope.info.user.tappa) {
                    console.log("ho trovato la meta");
                    $scope.dati.meta = $scope.dati.mete[i];

                }
            }
        });

        $scope.dati.impegni.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.impegni.length; i++) {
                if ($scope.dati.impegni[i].codice == $rootScope.info.user.codice && $scope.dati.impegni[i].tappa == $rootScope.info.user.tappa) {

                    count++;

                    if (count == 1) {
                        console.log("ho trovato il primo impegno");
                        $scope.dati.impegno1 = $scope.dati.impegni[i];
                    }
                    else if (count == 2) {
                        console.log("ho trovato il secondo impegno");
                        $scope.dati.impegno2 = $scope.dati.impegni[i];
                    }
                    else if (count == 3) {
                        console.log("ho trovato il terzo impegno");
                        $scope.dati.impegno3 = $scope.dati.impegni[i];
                    }
                }
            }
        });


        $scope.salvaMeteImpegni = function () {

            $scope.dati.feedback = "";
            $scope.dati.error = "";

            console.log("ho premuto su salva");


            Mete.aggiornaMetaAzione($scope.dati.meta.$id, $scope.dati.meta.azione);
            Impegni.aggiornaImpegnoAzione($scope.dati.impegno1.$id, $scope.dati.impegno1.azione);
            Impegni.aggiornaImpegnoAzione($scope.dati.impegno2.$id, $scope.dati.impegno2.azione);
            Impegni.aggiornaImpegnoAzione($scope.dati.impegno3.$id, $scope.dati.impegno3.azione);


            //$location.path("/sentiero/");
            $scope.dati.feedback = "Salvataggio avvenuto con successo";

        }


    }])

