

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Allowed roles
        default: 'user' // Default role
    },
    phoneNumber:{
        type: String,
        required: true
    },
    dateOfBirth:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
