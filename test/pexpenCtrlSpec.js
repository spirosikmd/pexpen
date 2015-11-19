/*global describe, it, beforeEach, inject, expect*/
(function () {
    'use strict';

    describe('Pexpen Controller', function () {
        var ctrl, store;

        // Load the module containing the app, only 'ng' is loaded by default.
        beforeEach(module('pexpen'));

        beforeEach(inject(function ($controller, $rootScope, localStorage) {
            var store = localStorage;

            localStorage.expenses = [];
            localStorage._getFromLocalStorage = function () {
                return [];
            };
            localStorage._saveToLocalStorage = function (expenses) {
                localStorage.expenses = expenses;
            };

            ctrl = $controller('PexpenCtrl', {
                store: store
            });
        }));

        it('should have a list of expenses on start', function () {
            expect(ctrl.expenses[0].name).toBe('Insurance');
        });
    });
}());
