/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the expenseService
 * - exposes the model to the template and provides event handlers
 */
angular = require('angular');

angular.module('pexpen')
    .controller('PexpenCtrl', function PexpenCtrl($scope, expenseService) {
        'use strict';

        var context = this;

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        context.expenses = expenseService.get();
        context.types = [];
        context.dates = [];
        context.totals = {};
        context.amounts = {};

        context.createExpense = function (expense) {
            if (!angular.isDefined(expense)) {
                return;
            }
            var type = expense.type;
            if (!angular.isDefined(type) || !angular.isString(type) || type === '') {
                return;
            }
            var date = new Date(expense.date); // use user timezone
            if (!angular.isDefined(date) || !angular.isDate(date) || date === '') {
                return;
            }
            var amount = expense.amount;
            if (!angular.isDefined(amount) || !angular.isNumber(amount) || amount === 0) {
                return;
            }
            date = monthNames[date.getMonth()] + ' ' + date.getFullYear();
            expenseService.insert(type, date, amount);
            $scope.expense = undefined;
            context.updateDates();
            context.updateTotals();
        };

        context.updateAmount = function (type, date, amount, parentIndex, index) {
            if (!angular.isDefined(amount) || !angular.isNumber(amount) || amount === 0) {
                return;
            }
            expenseService.put(type, date, amount);
            context.amounts[parentIndex][index].editing = false;
            context.updateTotals();
        };

        context.addType = function (type) {
            if (!angular.isDefined(type) || type === '') {
                return;
            }
            if (context.types.indexOf(type) !== -1) {
                return;
            }
            context.types.push(type);
            $scope.type = undefined;
        };

        context.updateDates = function () {
            angular.forEach(context.expenses, function (expense) {
                angular.forEach(expense, function (amount, date) {
                    date = new Date(date);
                    var dateValue = monthNames[date.getMonth()] + ' ' + date.getFullYear();
                    if (context.dates.indexOf(dateValue) === -1) {
                        // sort dates
                        context.dates.push(dateValue);
                    }
                });
            });
        };

        context.updateTypes = function () {
            angular.forEach(context.expenses, function (expense, type) {
                if (context.types.indexOf(type) === -1) {
                    context.types.push(type);
                }
            });
        };

        context.updateTotals = function () {
            angular.forEach(context.dates, function (date) {
                var total = 0;
                angular.forEach(context.types, function (type) {
                    var expense = context.expenses[type];
                    if (!angular.isDefined(expense)) {
                        return;
                    }
                    var amount = context.expenses[type][date];
                    if (!angular.isDefined(amount)) {
                        amount = 0;
                    }
                    total += amount;
                });
                context.totals[date] = total;
            });
        };

        context.update = function () {
            context.updateDates();
            context.updateTypes();
            context.updateTotals();
        };

        context.update();
    });
