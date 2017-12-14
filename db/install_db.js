"use strict"
require('dotenv').config();

const mongoose = require('mongoose');
const conn = require('../lib/connectMongoose')
const shajs = require('sha.js')
const sha256 = shajs(process.env.HASH)

const Ad = require('./models/Ad')
const User = require('./models/User')

conn.on('error', err => {
  console.log('Error!', err);
  process.exit(1);
});

conn.once('open', () => {
    console.log(`Connected to MongoDB en ${mongoose.connection.name}`);

    async function main(){
        let removeAds = await Ad.find({}).remove().exec();
        console.log('Removed Ads')

        var ad1 = new Ad({
            "name": "Bicicleta",
            "sell": true,
            "price": 230.15,
            "photo": "images/ads/bici.png",
            "tags": [ "lifestyle", "motor"]
        });
    
        let addAd1 = await ad1.save();
        console.log('Create Ad1')

        var ad2 = new Ad({
            "name": "iPhone 3GS",
            "sell": false,
            "price": 50.00,
            "photo": "images/ads/iphone.jpg",
            "tags": [ "lifestyle", "mobile"]
        });
    
        let addAd2 = await ad2.save();
        console.log('Create Ad2')

        let removeUsers = await User.find({}).remove().exec();
        console.log('Removed Users')

        var user = new User({
            "name": "admin",
            "email": "admin@admin.es",
            "password": sha256.update("password").digest('hex')
        });
    
        let addUser = await user.save();
        console.log('Create User')
    }

    main()
    .then(() => process.exit(0))
    .catch((err) => console.log('error: ' + err))

})

/* mongoose.connect('mongodb://localhost/nodepop', {
  useMongoClient: true
}); */