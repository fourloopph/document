'use strict';

var express = require('express');
var router = express.Router({
    strict: true,
    caseSensitive: true
});

var env = process.env.NODE_ENV;
var config = require('../../config/environment/' + env);

router.all('/home/*', function(req, res) {
    res.render('index');
});

router.all(config.api_version + '/*', function(req, res, next) {
     next();
});

exports.router = router;
