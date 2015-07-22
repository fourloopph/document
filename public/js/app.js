'use strict';
angular.module('document', [
          'ngSanitize', 'ui.router', 'ui.bootstrap', 'cgBusy',
        'ngFileUpload', 'angular-loading-bar', 'toastr','ngTable','ngDialog'
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
    });
   
