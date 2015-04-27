/**
 * Services that persists and retrieves expenses from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular = require('angular');

angular.module('pexpen')
    .factory('expenseService', function ($injector) {
        'use strict';
        return $injector.get('localStorage');
    })
    .factory('localStorage', function (localStorageService) {
        'use strict';

        var STORAGE_ID = 'expenses';

        var store = {
            expenses: {},

            get: function () {
                store.expenses = localStorageService.get(STORAGE_ID) || {};
                return store.expenses;
            },

            insert: function (type, date, amount) {
                if (!angular.isDefined(store.expenses[type])) {
                    store.expenses[type] = {};
                }
                store.expenses[type][date] = amount;
                localStorageService.set(STORAGE_ID, store.expenses);
            },

            put: function (type, date, amount) {
                store.expenses[type][date] = amount;
                localStorageService.set(STORAGE_ID, store.expenses);
            }
        };

        return store;
    });
