var env = process.env.NODE_ENV;

var mysql = require('mysql');
var config = require('../../config/environment/' + env);
var Database = require('../../app/utils/database').Database;
var db = new Database(mysql, config);
var async = require('async');
var fs = require('fs');

exports.insertDocument = function insertDocument(data, next) {
    var docobj = {

        DocumentType: data.DocumentType,
        DocumentName: data.DocumentName,
        documentAvailability: 0,

    };
    var docinsert = mysql.format('INSERT INTO documentation SET ?', docobj);
    db.insertWithId(docinsert, next);


};

exports.updateDocument = function updateDocument(data, next) {
    var sqljob = 'UPDATE documentation SET DocumentType = ?,DocumentName = ?,documentAvailability = ? WHERE DocumentationId=?';
    var updatetjob = [data.DocumentType, data.DocumentName, data.documentAvailability, data.DocumentationId];
    var sqlString = mysql.format(sqljob, updatetjob);
    db.actionQuery(sqlString, next);

};

exports.savefile = function savefile(data, next) {
    console.log('thepath is',data.path);
    var sqljob = 'UPDATE documentation SET documentAvailability = ?,documentRelativePath=?,documentUploadDate =now(),documentUploadedBy=? WHERE DocumentationId=?';
    var updatetjob = [1, data.path, 'ADMIN', data.DocumentationId];

    var sqlString = mysql.format(sqljob, updatetjob);
    db.actionQuery(sqlString, next);

};

exports.deleteDocument = function deleteDocument(id, next) {

  async.waterfall([
        function(callback) {
            var sql = 'SELECT documentRelativePath FROM documentation Where DocumentationId ='+id;
            db.query(sql, function(err, response) {
                if (err) {
                    callback(err, null);
                }
                

                if(response&&response.length){
                    console.log(response[0]);
                    fs.unlink(response[0].documentRelativePath);
                }
                callback(null, response);
            });
        },
        function(data, callback) {
            var sSQL = 'DELETE FROM documentation WHERE DocumentationId ='+id;
            db.query(sSQL, function(error, resp) {
                if (error) {
                    next(error, null);
                }
                callback(null,resp);
            });
        }
    ], next);

};

exports.getallDocument = function getallDocument(next) {

    var sql = 'SELECT * FROM documentation ORDER BY DocumentationId DESC;';
    db.query(sql, next);

};

exports.GetDocumentById = function GetDocumentById(id, next) {

    var sql = 'SELECT * FROM documentation WHERE DocumentationId = ' + id;
    db.query(sql, next);

};
