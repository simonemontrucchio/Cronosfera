'use strict';

//declare the module that will act as parent of all the services dedicated to retrieve/save information about the pizzas
angular.module('myAppEvento', [
    'myAppEvento.eventiService'
])

    .value('version', '0.1');
