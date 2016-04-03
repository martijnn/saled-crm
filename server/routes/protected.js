var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var config = require('../config');
// TODO, swap mlab with a local instance of mongodb
var mLab = require('mongolab-data-api')(config.mlab.apiKey);

router.use(function(req, res, next) {
    var token = req.headers.auth;

    jwt.verify(token, config.authkey, function(tokenError) {
        if (tokenError) {
            return res.status(500).json({
                message: "Invalid token, please Log in first"
            })
        }

        next();
    });
});

router.get('/', function(req, res, next) {
    res.json({
        title: "Protected call",
        text: "Greetings, you have valid token."
    });
});

router.get('/leads', function(req, res, next) {
    var options = {
        database: 'saled-crm',
        collectionName: 'leads'
    };

    mLab.listDocuments(options, function(err, leads) {
        if (err) {
            console.log(err);
        } else {
            res.json(leads);
        }
    });
});

router.post('/leads/create', function(req, res, next) {

    var options = {
        database: 'saled-crm',
        collectionName: 'leads',
        documents: req.body.lead
    };

    mLab.insertDocuments(options, function(err, doc) {
        if (err) {
            console.log(err);
        } else {
            res.json({message: "Lead created"});
        }
    });

});

module.exports = router;