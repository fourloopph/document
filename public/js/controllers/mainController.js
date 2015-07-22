'use strict';

angular.module('document')
    .controller('mainCtrl', function($scope, $window, documents, Upload, ngDialog) {

        function init() {
            var docarr = [];
            $scope.doc = {};
            $scope.docs = {};
            $scope.isUpdate = false;
            $scope.progressPercentage = 0;
            $scope.files = {};


            documents.getAllDocuments().then(function(data) {

                $scope.docs = data.result;

            });
        }

        $scope.refresh = function() {
            $scope.industries = {};
            documents.getAllDocuments().then(function(data) {
                $scope.docs = data;
            });
        };

        $scope.savedoc = function() {
            console.log('$scope.mainctrl: ', $scope.doc);
        };

      
           

        $scope.upload = function(id) {
            // console.log('id::',id);

          
            $scope.progressPercentage = 0;

            ngDialog.openConfirm({
                templateUrl: 'public/templates/directive/modalupload.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(value) {
                    console.log('option',$scope.option);
                console.log('upload: ', $scope.files);
                if ($scope.files && $scope.files.length) {
                    for (var i = 0; i < $scope.files.length; i++) {
                        var file = $scope.files[i];
                        Upload.upload({
                            url: 'api/1.0/document/upload',
                            fields: {
                                'ID': id
                            },
                            file: file
                        }).progress(function(evt) {
                            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                            // console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.file.name);
                        }).success(function(data, status, headers, config) {
                            // console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                        }).error(function(data, status, headers, config) {
                            // console.log('error status: ' + status);
                        });
                    }
                }
            });

        };

        $scope.uploadFile = function(files) {
            if (files && files.length) {
                $scope.files = files;
                console.log('$scope.files: ', $scope.files);
            }
        };

        init();
    });
