var mongoose = require('mongoose');
var usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    role: {
        type: String,
        default: "subscriber"
    },
    registrationDate: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

var UsersModel = mongoose.model('Users', usersSchema);

module.exports = UsersModel;