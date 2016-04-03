var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');
var mLab = require('mongolab-data-api')(config.mlab.apiKey);
var LENGTH = 64;

router.post('/signup', function(req, res, next) {

    if(!req.body.hasOwnProperty("password")) {
        var err = new Error('No password');
        err.status = 500;
        return next(err);
    }

    var salt = crypto.randomBytes(128).toString("base64");
    console.log(salt);
    console.log(req.body.password);
    crypto.pbkdf2(req.body.password, salt, 10000, LENGTH, function(err, hash) {
        console.log(err);
        if (err) throw err;

        var user = {
            database: config.mlab.dbName,
            collectionName: 'users',
            documents: {
                email: req.body.email,
                password: hash.toString("hex"),
                salt: salt
            }
        };

        mLab.insertDocuments(user, function(err, doc) {
            if (err) {
                console.log(err);
            } else {
                var token = jwt.sign(doc.email, config.authkey, { expiresIn: 60 * 60 * 24 * 7 });
                res.json({"jwt": token});
            }
        });

    });
});

router.post('/', function(req, res, next) {

    var options = {
        database: config.mlab.dbName,
        collectionName: 'users',
        query: '{ "email": "' + req.body.email + '" }',
        findOne: true
    };

    mLab.listDocuments(options, function(err, user) {
        if (err) {
            console.log(err);
        } else {
            crypto.pbkdf2(req.body.password, user.salt, 10000, LENGTH, function(err, hash) {
                if (err) throw err;
                
                if (hash.toString("hex") === user.password) {
                    var token = jwt.sign(user.email, config.authkey, { expiresIn: 60 * 60 * 24 * 7 });
                    res.json({"jwt": token});
                } else {
                    res.json({message: "Wrong password"});
                }
            });
        }
    });
});

module.exports = router;