const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
        min: 5,
        max: 15
    },
    lastname: {
        type: String,
        require: true,
        min: 5,
        max: 15
    },
    userImg: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    contact: {
        type: Number,
        require: true
    },
    address1: {
        type: String,
        require: true
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    zipCode: {
        type: Number
    }
});

const UserModel = new mongoose.model('User', UserSchema);

module.exports = UserModel;