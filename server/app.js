var mongoose = require('./db/mongoose');
mongoose.loadModels();

var express = require('./express');
var db = require('./db/main');
var config = require('./config');

module.exports.init = function init(callback) {

    mongoose.connect(function(db) {
        var app = express.init(db);
        if (callback) callback(app, db, config);
    });

};

module.exports.start = function start() {
    var _this = this;

    _this.init(function(app, db, config) {
        app.listen(config.db.port, function() {
            console.log('--');
            console.log('App ' + config.app.title + ' started.');
            console.log('Listening on port: ' + config.db.port);
            console.log('--');
        });

    })
};
