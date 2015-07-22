'use strict';
angular.module('document')
    .directive('navBar', function() {
        return {
            restrict: 'AE',
            templateUrl: 'public/templates/directive/header.html'
        };
    });
