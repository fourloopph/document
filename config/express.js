'use strict';
var express = require('express');
var morgan = require('morgan');
var multer  = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var router = require('../app/utils/router').router;
var expressValidator = require('express-validator');
var path = require('path');
var flash = require('connect-flash');

module.exports = function(app, passport, config) {


    app.use('/public', express.static(__dirname + '../../public'));
    app.set('port', config.port || process.env.APP_PORT || 3000);
    app.set('ip', config.ip);
    app.set('env', config.env);
    app.set('config', config);
    app.set('api_version', process.env.APP_VER || '/api/v1');
    app.set('view engine', 'ejs');
    app.set('views', 'app/views/');
    app.use(morgan('dev'));
    app.use(methodOverride());
    app.use(expressValidator());
    app.use(cookieParser());
    app.use(bodyParser.json({
        type: 'application/json'
    }));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: 'li-v3',
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 3600000
        }
    }));
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(router);
    app.use(multer({limits: {fileSize:10*1024*1024}}));
}
