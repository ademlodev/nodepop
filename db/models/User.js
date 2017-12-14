"use strict";

const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {type: String, index:true, unique:true},
    email: String,
    password: String
},
{  
    collection : 'users'
});

const User = mongoose.model('User',userSchema);

module.exports = User;