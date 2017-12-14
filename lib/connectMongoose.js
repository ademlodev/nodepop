"use strict"

const mongoose = require('mongoose');
var conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', (err) =>
    console.error('mongodb connection error', err) 
);

conn.once('open', () =>
    console.info('Connected to mongodb.') 
);

mongoose.connect('mongodb://localhost/nodepop', {
    useMongoClient: true,
});

module.exports = conn;