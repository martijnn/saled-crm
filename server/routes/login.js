var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var config = require('../config');
var mLab = require('mongolab-data-api')(config.db.mlab.apiKey);
var mongoose = require('mongoose');
var User = mongoose.model('Users');

var LENGTH = 64;

router.post('/signup', function(req, res, next) {

    if(!req.body.hasOwnProperty("password")) {
        var err = new Error('No password');
        err.status = 500;
        return next(err);
    }
    var email = req.body.email;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString("base64");

    if (config.dev.mongoose) {

        crypto.pbkdf2(password, salt, 10000, LENGTH, function(err, hash) {
            if (err) throw err;

            var user = new User({
                email: email,
                password: hash.toString("hex"),
                salt: salt
            });

            user.save(function(err) {
                if (err) throw err;
            });

        });

    } else {

        crypto.pbkdf2(password, salt, 10000, LENGTH, function(err, hash) {
            if (err) throw err;
    
            var user = {
                database: config.db.mlab.dbName,
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
    }
});

router.post('/', function(req, res, next) {

    if (config.dev.mongoose) {

        var query = {email: req.body.email};

        User.findOne(query, function(err, user) {
           if (err || user === undefined) {
               console.log(err);
               next(err);
           } else {
               crypto.pbkdf2(req.body.password, user.salt, 10000, LENGTH, function (err, hash) {
                   if (err) throw err;

                   if (hash.toString("hex") === user.password) {
                       var token = jwt.sign(user.email, config.authkey, {expiresIn: 60 * 60 * 24 * 70});
                       res.json({"jwt": token});
                   } else {
                       res.json({message: "Wrong password"});
                   }
               });
           }
        });

    } else {

        var options = {
            database: config.db.mlab.dbName,
            collectionName: 'users',
            query: '{ "email": "' + req.body.email + '" }',
            findOne: true
        };

        mLab.listDocuments(options, function (err, user) {
            if (err) {
                console.log(err);
                next(err);
            } else {
                crypto.pbkdf2(req.body.password, user.salt, 10000, LENGTH, function (err, hash) {
                    if (err) throw err;

                    if (hash.toString("hex") === user.password) {
                        var token = jwt.sign(user.email, config.authkey, {expiresIn: 60 * 60 * 24 * 7});
                        res.json({"jwt": token});
                    } else {
                        res.json({message: "Wrong password"});
                    }
                });
            }
        });
    }
});

module.exports = router;
