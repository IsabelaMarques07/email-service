'use strict'

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    active:{
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Category', schema);