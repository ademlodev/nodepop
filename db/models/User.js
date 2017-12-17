"use strict";

const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {type: String, index:true, unique:true, required:true},
    email: {type: String, index: true, unique:true, required:true },
    password: {type: String}
},
{  
    collection : 'users'
});

const User = mongoose.model('User',userSchema);

module.exports = User;