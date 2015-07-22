var env = process.env.NODE_ENV;

var mysql = require('mysql');
var config = require('../../config/environment/' + env);
var Database = require('../../app/utils/database').Database;
var db = new Database(mysql, config);
var bcrypt = require('bcrypt-nodejs');

exports.insertDocument = function insertDocument(data, next) {
    var docobj = {

        DocumentType: data.DocumentType,
        DocumentName: data.DocumentName,
        documentAvailability: data.documentAvailability,
        documentRelativePath: data.documentRelativePath,
        documentUploadDate: data.documentUploadDate,
        documentUploadedBy: data.documentUploadedBy
    };
    var docinsert=mysql.format('INSERT INTO documentation SET ?',docobj);
    db.insertWithId(docinsert,next);

};

exports.updateDocument = function updateDocument(data, next) {
	var sqljob = 'UPDATE documentation SET DocumentType = ?,DocumentName = ?,documentAvailability = ? WHERE DocumentationId=?';
    var updatetjob = [data.DocumentType, data.DocumentName, data.documentAvailability,data.DocumentationId];
    var sqlString = mysql.format(sqljob, updatetjob);
    db.actionQuery(sqlString, next);

};

exports.savefile =function savefile(data,next){
    var sqljob = 'UPDATE documentation SET documentAvailability = ?,documentRelativePath=?,documentUploadDate =?,documentUploadedBy=? WHERE DocumentationId=?';
    var updatetjob = [ 1, data.target_path,'NOW()','ADMIN',data.DocumentationId];
    var sqlString = mysql.format(sqljob, updatetjob);
    db.actionQuery(sqlString, next);

};

exports.deleteDocument = function deleteDocument(id, next) {


};

exports.getallDocument = function getallDocument(next) {

	 var sql = 'SELECT * FROM documentation ORDER BY DocumentationId DESC;';
    db.query(sql, next);

};

exports.GetDocumentById = function GetDocumentById(id, next) {

	 var sql = 'SELECT * FROM documentation WHERE DocumentationId = '+ id;
    db.query(sql, next);

};
