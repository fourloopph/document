'use strict';

angular.module('document')
    .factory('documents', function($http, $q) {
        var abouts = {};

        return {
            getAllDocuments: function(callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/document')
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            getDocumentsById: function(id,callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.get('/api/1.0/document/'+ id)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            createDocument: function(data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/1.0/document/comments', data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            savecomment: function(data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('/api/1.0/document', data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            updateDocument: function(id, data, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.put('/api/1.0/industry/' + id, data)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
            deleteDocument: function(id, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.delete('/api/1.0/document/' + id)
                    .success(function(data) {
                        deferred.resolve(data);
                        return cb();
                    })
                    .error(function(err) {
                        deferred.reject(err);
                        return cb(err);
                    }.bind(this));

                return deferred.promise;
            },
        };
    });
