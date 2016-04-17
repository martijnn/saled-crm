'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var config = require('../config');


module.exports.loadModels = function (callback) {
    require('./models/lead.model');
    require('./models/user.model');
    if (callback) callback();
};

module.exports.connect = function (callback) {
    var db = mongoose.connect(config.db.mongo.uri, config.db.mongo.options, function (err) {
        if (err) {
            console.error('Could not connect to MongoDB!');
            console.log(err);
        } else {
            if (callback) callback(db);
        }
    });
};

module.exports.disconnect = function (callback) {
    mongoose.disconnect(function (err) {
        console.info('Disconnected from MongoDB.');
        callback(err);
    });
};
