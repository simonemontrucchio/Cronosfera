'use strict';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyDpA_SgLvx9ebqS8XH4j076CdyGO20B61I",
    authDomain: "cronosfera-9b58a.firebaseapp.com",
    databaseURL: "https://cronosfera-9b58a.firebaseio.com",
    projectId: "cronosfera-9b58a",
    storageBucket: "cronosfera-9b58a.appspot.com",
    messagingSenderId: "441218176032"
};
firebase.initializeApp(config);

var app = angular.module('myApp', [
        'ngMaterial',
        'ngRoute',
        "firebase",
    'myAppSentiero',
        'myAppLuogoTappa',
        'myAppLogin',
        'myAppAuthentication',
        'myAppHome',
    'myAppRegistrazioneRagazzo',
    'myAppSquadriglia',
    'myAppListaSpecialita',
        'myAppRegistration',
    'myAppSquadriglia',
    'myAppFormaSquadriglie',
    'myAppStaff',
    'myAppEvento',
    'myAppAssegnaTappa',
    'myAppSpecialita',
    'myAppCartaSpecialita',
        'myAppProfilo',
    'myAppUtente',
    'myAppConfermaScadenze',
    'myAppRiepilogoScadenze',
    'myAppSceltaMaestro',
    'myAppScadenzeCarta',
    'myAppVisualizzaCartaSpecialita',
    'myAppMete',
    'myAppImpegni',
    'myAppMeteImpegni',
        'myApp.fileUpload',
        'myAppTappa',
        'myAppAiuto',
    'myAppListaBrevetti',
    'myAppCartaCompetenza',
    'myAppSceltaMaestroBrev',
    'myAppVisualizzaCartaCompetenza',
        'myAppAggiornaProfilo'
]);


app.config(['$locationProvider', '$routeProvider', '$mdThemingProvider', function ($locationProvider, $routeProvider, $mdThemingProvider) {

    //TEMA DELL'APP
    $mdThemingProvider.theme('default')
        .primaryPalette('light-blue', {
            'default': '500', // by default use shade 500 from the green palette for primary intentions
            'hue-1': '700', // use shade 700 for the <code>md-hue-1</code> class
            'hue-2': '800' // use shade 800 for the <code>md-hue-2</code> class
        })
        .accentPalette('light-blue');


    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
        redirectTo: '/home'
    });
}]);


app.run(["$rootScope", "$location", function ($rootScope, $location) {
    $rootScope.$on("$routeChangeError", function (event, next, previous, error) {
        console.log("sono nel on change route error del run del app.js")
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });
}]);


app.controller('LogCtrl', ['$scope', '$rootScope', 'Utente', '$firebaseAuth', '$location', 'Scadenza', function ($scope, $rootScope, Utente, $firebaseAuth, $location, Scadenza) {



    //variabile che permette di scaricare i dati dell'utente loggato solo una volta all'avvio dell'app
    $rootScope.info = {};
    $rootScope.info.info = false;
    //console.log("Nel LogCtrl setto info a false, e vale: " +  $rootScope.info.info);



    //MOSTRA ALCUNE PARTI SOLO SE SI E' LOGGATI
    $scope.isLogged = function () {
        if ($firebaseAuth().$getAuth()) {
            if ($rootScope.info.info == false) {
                $scope.InfoUserLogged();
            }

            return true;
        }
        else
            return false;
    }


    //PRENDE TUTTI I DATI DELL'UTENTE LOGGATO
    $scope.InfoUserLogged = function () {
        $rootScope.info.info = true;
        //console.log("Nel InfoUserLogged setto info a true, e vale: " +  $rootScope.info.info);
        $rootScope.info = {};
        $rootScope.info.user = Utente.getUserInfo($firebaseAuth().$getAuth().uid);
    }


}]);


//GESTISCE LE SIDENAV
app.controller('AppCtrl1', function ($scope, $rootScope, $timeout, $mdSidenav, $log) {

    $scope.toggleLeft = buildDelayedToggler('left');

    $scope.notifiche = function () {
        console.log("Hai cliccato su notifiche");
        $scope.data = {
            menu: "notifications"
        };
        console.log("vado al build toggler");

        $scope.toggleRight = buildToggler('right');
        $scope.toggleRight();
    };

    $scope.eventi = function () {
        console.log("Hai cliccato su eventi");

        $scope.data = {
            menu: "events"
        };
        console.log("vado al build toggler");

        $scope.toggleRight = buildToggler('right');
        $scope.toggleRight();
    };


    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
        return debounce(function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        };
    }
});


app.controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });

    };
});




