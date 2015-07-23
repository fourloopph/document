'use strict';
angular.module('document', [
        'angularUtils.directives.dirPagination', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'cgBusy',
        'ngFileUpload', 'angular-loading-bar', 'toastr', 'ngTable', 'ngDialog', 'validation', 'validation.rule'
    ])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
        $stateProvider
            .state('main', {
                url: '/home',
                templateUrl: 'public/templates/main.html',
                controller: 'mainCtrl'

            })
            .state('juneril', {
                url: '/home/juneril',
                templateUrl: 'public/templates/main.html',
                controller: 'mainCtrl'
            });

        $urlRouterProvider.otherwise('/home');

        $locationProvider.html5Mode(true);
    })
    .config(['ngDialogProvider', function(ngDialogProvider) {
        ngDialogProvider.setDefaults({
            className: 'ngdialog-theme-default',
            plain: false,
            showClose: false,
            closeByDocument: false,
            closeByEscape: true
        });
    }]);
