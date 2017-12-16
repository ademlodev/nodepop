"use strict"
require('dotenv').config();

const mongoose = require('mongoose');
const conn = require('../lib/connectMongoose')
var hash = require('hash.js')

//Cargo los esquemas y los datos
const Ad = require('./models/Ad')
const User = require('./models/User')
const initialData = require('./initialData/initialData.json')

conn.on('error', err => {
  console.log('Error!', err);
  process.exit(1);
});

conn.once('open', () => {
    console.log(`Connected to MongoDB en ${mongoose.connection.name}`);

    async function main(){
        await Ad.find({}).remove().exec();
        console.log('Removed Ads')

        await User.find({}).remove().exec();
        console.log('Removed Users')

        await Ad.insertMany(initialData.ads, (err)=>{
            if (err){
                throw err;
            }
            console.log('Ads created') 
        });

        for (let i=0; i < initialData.users.length; i++){
            initialData.users[i].password = hash.sha256().update(initialData.users[i].password).digest('hex')
        } 
        await User.insertMany(initialData.users, (err)=>{
            if (err){
                throw err;
            }
            console.log('Users created') 
        });
    }

    main()
        .then(() => process.exit(0))
        .catch((err) => console.log('error: ' + err))
})