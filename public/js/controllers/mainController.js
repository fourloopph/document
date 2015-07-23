'use strict';

angular.module('document')
    .controller('mainCtrl', function($scope, $filter, $window, documents, Upload, ngDialog, ngTableParams) {

        function init() {
            var docarr = [];
            $scope.doc = {};
            $scope.docs = {};
            $scope.isUpdate = false;
            $scope.isDisable = true;
            $scope.progressPercentage = 0;
            $scope.files = {};
            $scope.option = {};
            // paginationinit
            $scope.currentPage = 1;
            $scope.pageSize = 10;
            $scope.tableParams = {};
            $scope.fileselection={};


            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 10, // count per page
                sorting: {
                    name: 'asc' // initial sorting
                }
            }, {
                getData: function($defer, params) {
                    documents.getAllDocuments().then(function(res) {
                        var data = res.result;
                        var orderedData = {};

                        if ($scope.search) {
                            orderedData = $filter('filter')(data, $scope.search);
                            orderedData = params.sorting() ? $filter('orderBy')(orderedData, params.orderBy()) : orderedData;
                        } else {
                            orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                        }

                        params.total(data.length);
                        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    });
                }
            });


        }

        $scope.refresh = function() {
            $scope.tableParams.reload();
            $scope.search = "";
        };

        $scope.savedoc = function() {
            console.log('$scope.mainctrl: ', $scope.newDoc);
            documents.createDocument($scope.newDoc).then(function(data) {
                $scope.refresh();
            })
        };



        $scope.addNew = function() {
            $scope.newDoc = {};
            $scope.isUpdate = false;
            $scope.isDisable = false;
        };

        $scope.cancel = function() {
            $scope.newDoc = {};
            $scope.isUpdate = false;
            $scope.isDisable = true;
        };

        $scope.delete = function(id) {
            ngDialog.openConfirm({
                templateUrl: 'public/templates/directive/deleteModal.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function() {
                documents.deleteDocument(id).then(function(){
                    $scope.refresh();
                });

            });
        };

        $scope.viewModify = function(id) {
            documents.getDocumentsById(id).then(function(data) {
                $scope.newDoc = data.result[0];
                $scope.isUpdate = true;
                $scope.isDisable = false;
            });
        };

        $scope.searchclick = function() {
            $scope.tableParams.reload();
        };

        // $scope.$watch("search", function() {
        //     $scope.tableParams.reload();
        // });


        $scope.upload = function(id) {
            // console.log('id::',id);

            $scope.progressPercentage = 0;

            ngDialog.openConfirm({
                templateUrl: 'public/templates/directive/modalupload.html',
                className: 'ngdialog-theme-default',
                scope: $scope
            }).then(function(value) {
                if ($scope.files && $scope.files.length) {
                    for (var i = 0; i < $scope.files.length; i++) {
                        var file = $scope.files[i];
                        Upload.upload({
                            url: 'api/1.0/document/upload',
                            fields: {
                                'ID': id,
                                'selectType': $scope.option.id
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
                } else {
                    console.log('wala');
                }
            });

        };

        $scope.uploadFile = function(files) {
            if (files && files.length) {
                $scope.files = files;
                console.log('$scope.files: ', $scope.files);
                 $scope.fileselection=0;
            }else{
                $scope.fileselection=1;
            }
        };

        init();
    });
