'use strict';

exports.setupResponseCallback = function (res) {

    return function (error, returnValue) {
        if (error) {
            return res.status(500).json({msg: error, statusCode: 500});
        }

        res.status(200).json({result: returnValue, statusCode: 200});
    };
};
exports.setupResponseEmpJobsCallback = function (res) {

    return function (error, returnValue) {
        if (error) {
            return res.status(500).json({msg: error, statusCode: 500});
        }

        res.status(200).send(returnValue);
    };
};

exports.setupResponseTokenCallback = function (res) {

    return function (error, returnValue) {
        if (error) {
            return res.status(500).json({msg: error, statusCode: 500});
        }

        res.status(200).json({token: returnValue, statusCode: 200});
    };
};

exports.handleError = function (err, res, next) {
    if(err){
        res.status(500).end();
    }else{
        next();
    }
};

exports.requestErrorHandler = function(callback) {
    return function (err, resp) {
        if(err) {
            console.log('Error', err);
            return callback(err, {});
        }
        console.log('Response from API ----- ', resp.body);
        return callback(null, resp.body);
    };
};

exports.parseKeys = function(res){
    return function(error, value){
        if(error){
            return res.status(500).json({msg: error, statusCode: 500});
        }
        var arr = [];

        for (var i = 0; i < value.length; i++) {
            if( value[i]._id !== '\'_id\'' || value[i]._id !== '\'__v\''){
                arr.push(value[i]._id);
            }
        }

        res.status(200).json({result: arr, statusCode: 200});
    };
};
