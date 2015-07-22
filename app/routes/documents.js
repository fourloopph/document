'use strict';

var documentCtrl = require('../controllers/documentController');
var cb = require('./../utils/callback');

module.exports = function(app, config) {
    app.route(config.api_version + '/document')
        .post(function onRequest(req, res) {
            documentCtrl.insertDocument(req.body, cb.setupResponseCallback(res));
        })
        .put(function onRequest(req, res) {
            documentCtrl.updateDocument(req.body, cb.setupResponseCallback(res));

        })
        .delete(function onRequest(req, res) {
            documentCtrl.deleteDocument(req.params.id, cb.setupResponseCallback(res));
        })
        .get(function onRequest(req, res) {
            documentCtrl.getallDocument(cb.setupResponseCallback(res));

        });
    app.route(config.api_version + '/document/:id')
        .get(function onRequest(req, res) {
            documentCtrl.GetDocumentById(req.params.id, cb.setupResponseCallback(res));
        });

    app.route(config.api_version + '/document/upload')
        .post(function onRequest(req, res, next) {
            var docfile = req.files.file;
            docfile.DocumentId=req.body.ID;
            docfile.selectType=req.body.selectType;
            console.log('body',req.body);
            documentCtrl.uploadDocument(docfile,cb.setupResponseCallback(res));

        });
};
