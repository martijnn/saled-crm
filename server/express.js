'use strict';

var express = require('express');
var path = require('path');
var helmet = require('helmet');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');

var protect = require('./routes/protected');
var login = require('./routes/login');

module.exports.initLocalVariables = function(app) {
    app.locals.title = config.app.title;
};

module.exports.initMiddleware = function(app) {
    app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
    app.use(favicon(path.join(__dirname, '../client', 'favicon.ico')));
    app.use(express.static("./client"));
    app.use(express.static("./node_modules/"));
    app.use(logger('dev'));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
};

module.exports.initHelmetHeaders = function (app) {
    // Use helmet to secure Express headers
    var SIX_MONTHS = 15778476000;
    app.use(helmet.xframe());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.use(helmet.frameguard());
    app.disable('x-powered-by');
};

module.exports.initRoutes = function(app) {
    app.use('/api', protect);
    app.use('/login', login);
};

module.exports.initErrorHandler = function(app) {

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: {}
        });
    });
};

module.exports.init = function (db) {

    var app = express();

    this.initLocalVariables(app);
    this.initMiddleware(app);
    this.initHelmetHeaders(app);
    this.initRoutes(app);
    this.initErrorHandler(app);

    return app;
};
