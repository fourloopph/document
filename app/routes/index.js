'use strict';

module.exports = function(app) {

    

    app.route('/home').get(function(req, res) {
        res.render('index');
    });

    app.route('/').get(function(req, res) {
        res.render('index');
    });

   
};
