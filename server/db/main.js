var mongoose = require('mongoose');
var chalk = require('chalk');
var config = require('../config');

module.exports.connect = function(callback) {
    var db = mongoose.connect(config.db.mongo.uri, config.db.mongo.options, function(err) {
        if (err) {
            console.error(chalk.red('Could not connect to MongoDB!'));
            console.log(err);
        } else {
            if (callback) callback(db);
        }
    });
};

module.exports.disconnect = function (callback) {
    mongoose.disconnect(function (err) {
        console.info(chalk.yellow('Disconnected from MongoDB.'));
        callback(err);
    });
};