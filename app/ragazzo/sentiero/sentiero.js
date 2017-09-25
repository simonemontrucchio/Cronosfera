var app = angular.module('myAppSentiero', [
    'ngMaterial',
    'ngRoute',
    'myAppListaSpecialita'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/sentiero', {
        templateUrl: 'ragazzo/sentiero/sentiero.html',
        controller: 'myAppSentieroCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);


app.controller('myAppSentieroCtrl', ['$scope', '$rootScope', 'Brevetti', 'CartaCompetenza', 'Mete', 'Impegni', 'Scadenza', 'Utente', 'CartaSpecialita', '$mdDialog', '$firebaseStorage', '$location',
    function ($scope, $rootScope, Brevetti, CartaCompetenza, Mete, Impegni, Scadenza, Utente, CartaSpecialita, $mdDialog, $firebaseStorage, $location) {

        $scope.dati = {}
        $scope.dati.utenti = Utente.getData();
        $scope.dati.mete = Mete.getData();
        $scope.dati.impegni = Impegni.getData();


        $scope.dati.utente = $rootScope.info.user
        $scope.dati.cartaSpec = CartaSpecialita.getData()
        $scope.dati.scadenze = Scadenza.getData()
        $scope.dati.cartaSpec.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.cartaSpec.length; i++) {
                for (var j = 0; j < $scope.dati.scadenze.length; j++) {
                    if ($scope.dati.scadenze[j].carta_spec == $scope.dati.cartaSpec[i].$id) {
                        //console.log("entro nel if scadenza appartiene a carta attuale")
                        if ($scope.dati.scadenze[j].conferma == false) {
                            //console.log("trovo una scadenza non confermata")
                            $scope.dati.cartaSpec[i].attiva = true;
                            //console.log("La carta " + $scope.dati.cartaSpec[i].$id + " è attiva");
                        }
                    }
                }
            }
        });


        $scope.dati.cartaComp = CartaCompetenza.getData();
        $scope.dati.cartaComp.$loaded().then(function () {
            for (var i = 0; i < $scope.dati.cartaComp.length; i++) {
                if ($scope.dati.cartaComp[i].ragazzo == $rootScope.info.user.codice) {
                    $scope.dati.cartaComp[i].attiva = true;
                }
            }
        })


    }]);