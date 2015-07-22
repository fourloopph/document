'use strict';

var env = process.env.NODE_ENV || 'development',
    application = require('./config/application'),
    express = require('express'),
    mysql = require('mysql'),
    bunyan = require('bunyan'),
    passport = require('passport'),
    config = require('./config/environment/' + env),
    Database = require('./app/utils/database').Database,
    db = new Database(mysql, config),
    log = bunyan.createLogger({
        name: config.app_name
    }),
    app = express();

var router = express.Router({
    strict: true,
    caseSensitive: true
});


process.env.NODE_ENV = env;

require(application.utils + 'helper')(db, app, log);
require(application.config + 'express')(app, passport, config);


require(application.routes + 'documents')(app,config);
require(application.routes + '/')(app);
module.exports = app;
