'use strict';

var env = process.env.NODE_ENV;
var docDaos = require('../daos/documentDao');

var fs = require('fs');
var fsx = require('fs-extra');
var mysql = require('mysql'),
    bcrypt = require('bcrypt-nodejs'),
    config = require('../../config/environment/' + env),
    Database = require('../../app/utils/database').Database,
    db = new Database(mysql, config),
    async = require('async');

exports.insertDocument = function insertDocument(data, next) {
    docDaos.insertDocument(data, function(err, res) {
        next(err, res);
    });

};

exports.updateDocument = function updateDocument(data, next) {
    docDaos.updateDocument(data, function(err, res) {
        next(err, res);
    })

};

exports.deleteDocument = function deleteDocument(id, next) {

    docDaos.deleteDocument(id, function(err, res) {
        next(err, res);
    })

};

exports.getallDocument = function getallDocument(next) {
    docDaos.getallDocument(function(err, res) {
        next(err, res);
    })

};

exports.GetDocumentById = function GetDocumentById(id, next) {

    docDaos.GetDocumentById(id, function(err, res) {
        next(err, res);
    })

};

exports.uploadDocument = function uploadDocument(docfile, next) {
    var tmp_path = docfile.path;
    var path = './public/files/';
    var target_path = path + docfile.name;


    var updatedocument = function(data) {
        docDaos.savefile(data, function(err, res) {
            console.log(res);
            next(err, res);
        });


    };

    if (!fsx.existsSync(path)) {


        fsx.ensureDirSync(path);
        fs.rename(tmp_path, target_path, function(err) {
            if (err) next(err, null);
            // delete the temporary file, so that the explicitly set temporary upload dir does not get filled with unwanted files
            fs.unlink(tmp_path, function() {
                if (err) next(err, null);
                var data = {
                    DocumentationId: docfile.DocumentId,
                    path: target_path,
                    size: docfile.size,
                    originalname: docfile.originalname,
                    name: docfile.name,
                    extension: docfile.extension
                };
               updatedocument(data);
            });
        });


    } else {

        fs.rename(tmp_path, target_path, function(err) {
            if (err) next(err, null);
            fs.unlink(tmp_path, function() {
                if (err) next(err, null);
                 var data = {
                    DocumentationId: docfile.DocumentId,
                    path: target_path,
                    size: docfile.size,
                    originalname: docfile.originalname,
                    name: docfile.name,
                    extension: docfile.extension
                };
               updatedocument(data);
            });
        });
    }





};
