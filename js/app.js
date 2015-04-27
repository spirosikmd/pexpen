/**
 * The main app module
 *
 * @type {angular.Module}
 */

angular = require('angular');
require('angular-route');
require('angular-local-storage');
require('../dist/templateCachePartials');

angular.module('pexpen', ['ngRoute', 'LocalStorageModule', 'pexpenPartials'])
    .config(function ($routeProvider, localStorageServiceProvider) {
        'use strict';

        var STORAGE_ID = 'pexpen';

        var routeConfig = {
            controller: 'PexpenCtrl',
            controllerAs: 'pexpen',
            templateUrl: '/partials/pexpen-index.html',
            resolve: {
                expenseService: ['expenseService', function (expenseService) {
                    return expenseService;
                }]
            }
        };

        $routeProvider
            .when('/', routeConfig)
            .otherwise({
                redirectTo: '/'
            });

        localStorageServiceProvider
            .setPrefix(STORAGE_ID);
    });

require('pexpenCtrl');
require('expenseService');
