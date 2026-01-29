const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const bloodDonorSchema = new mongoose.Schema({
   name: {
        type: String,
        required: [true, 'Name is required'], 
        trim: true
    },
     email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
     password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        select: false
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
    },
    role: {
        type: String,
        enum: ['donor', 'patient', 'admin'],
        default: 'patient'
    },
})