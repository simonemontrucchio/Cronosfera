'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myAppUtente', [
    'myAppUtente.registrazioneRagazzoService',
    'myAppUtente.utentiService'
])

    .value('version', '0.1');
