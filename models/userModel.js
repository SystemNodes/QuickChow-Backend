const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    signupOtp: {
        type: String,
    },
    signupOtpExpires: {
        type: Date,
        expires: 600
    },
    resetOtp: {
        type: String,
    },
    resetOtpExpires: {
        type: Date,
        expires: 600
    },
    resetOtpVerified: { 
        type: Boolean, 
        default: false
    }
}, {
    timestamps: true
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;
