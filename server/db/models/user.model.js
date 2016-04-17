'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uuid = require('uuid');

var UserSchema = new Schema({
    id: {
        type: String,
        default: uuid.v4
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    roles: {
        type : String,
        enum: [
            'User',
            'Admin'
        ],
        default: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Users', UserSchema);
