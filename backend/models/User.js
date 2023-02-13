const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name'],
        minlength: 3
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,//conver email to lowercase
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: 8
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", UserSchema);