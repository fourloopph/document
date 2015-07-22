'use strict';

var Database = function(mysql, config) {

    var self = this;
    self.connect = function onConnect(cb) {

        var configuration = {
            host: config.dbUrl,
            user: config.db_user,
            password: config.db_password,
            database: config.db_name
        };

        var connection = mysql.createConnection(configuration);

        connection.connect(function(err) {
            if (err) {
                return cb(err, false);
            }
            return cb(connection, true);
        });
        connection.end();
    };

    self.query = function onQuery(sql, cb) {
        var configuration = {
            host: config.dbUrl,
            user: config.db_user,
            password: config.db_password,
            database: config.db_name
        };

        var connection = mysql.createConnection(configuration);
        connection.query(sql, function(err, rows) {
            if (err) {
                return cb(true, err);
            }
            return cb(false, rows);
        });
        connection.end();
    };

    self.insertWithId = function onQuery(sql, cb) {
        var configuration = {
            host: config.dbUrl,
            user: config.db_user,
            password: config.db_password,
            database: config.db_name
        };

        var connection = mysql.createConnection(configuration);
        connection.query(sql, function(err, result) {
            if (err) {
                return cb(true, err);
            }
            return cb(false, result.insertId);
        });
        connection.end();
    };

    self.insertBulkWithId = function onQuery(sql,data, cb) {
        var configuration = {
            host: config.dbUrl,
            user: config.db_user,
            password: config.db_password,
            database: config.db_name
        };

        var connection = mysql.createConnection(configuration);
        connection.query(sql,data, function(err, result) {
            if (err) {
                return cb(true, err);
            }
            return cb(false, result.insertId);
        });
        connection.end();
    };

    self.actionQuery = function onQuery(sql, cb) {
        var configuration = {
            host: config.dbUrl,
            user: config.db_user,
            password: config.db_password,
            database: config.db_name
        };

        var connection = mysql.createConnection(configuration);
        connection.query(sql, function(err, result) {
            if (err) {
                return cb(true, err);
            }
            return cb(false, result.affectedRows);
        });
        connection.end();
    };
};


exports.Database = Database;
