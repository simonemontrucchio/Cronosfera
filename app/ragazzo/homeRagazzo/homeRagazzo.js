var app = angular.module('myAppHomeRagazzo', [
    'ngMaterial',
    'ngRoute',
    'myAppEvento'
]);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/homeRagazzo', {
        templateUrl: 'ragazzo/homeRagazzo/homeRagazzo.html',
        controller: 'myAppHomeRagazzoCtrl',
        resolve: {
            "currentAuth": ["Auth", function (Auth) {
                return Auth.$requireSignIn();
            }]
        }
    })
}]);

app.controller('myAppHomeRagazzoCtrl', ['$scope', '$rootScope', 'Evento', '$firebaseAuth', 'Utente', 'Scadenza', 'Specialita', function ($scope, $rootScope, Evento, $firebaseAuth, Utente, Scadenza, Specialita) {
    $scope.dati = {}
    $scope.dati.feedback = ""

    //SCARICO TUTTI I DATI
    $scope.dati.utenti = Utente.getData();
    $scope.dati.scadenze = Scadenza.getData();
    $scope.dati.specialita = Specialita.getData();
    $scope.dati.eventi = Evento.getData();


}]);