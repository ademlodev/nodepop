"use strict"

const mongoose = require('mongoose');
var conn = mongoose.connection;

const databaseUri = process.env.DATABASE_URI || 'mongodb://localhost:27017/nodepopdb';

mongoose.Promise = global.Promise;

conn.on('error', (err) =>
    console.error('mongodb connection error', err) 
);

conn.once('open', () =>
    console.info('Connected to mongodb.') 
);

mongoose.connect(databaseUri, {
    useMongoClient: true,
});

module.exports = conn;