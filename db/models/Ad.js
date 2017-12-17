"use strict";

const mongoose = require('mongoose');

var adSchema = mongoose.Schema({
    name: { type: String, index:true, unique:true, required:true},
    sell: Boolean,
    price: Number,
    photo: String,
    tags: [String]
},
{  
    collection : 'ads'
});

adSchema.statics.list = function(filters, start, limit, sort) {

    //const query = Ad.find(filters);
    const query = Ad.find();
    if (filters.name){
        query.where('name').equals(filters.name);
    }
    if (filters.tags){
        query.where('tags').in(new Array(filters.tags));
    }
    if (filters.sell){
        query.where('sell').equals(filters.sell);
    }
    if (filters.price){
        query.where('price').equals(filters.price);
    }
    if (filters.priceMin){
        query.where('price').gte(filters.priceMin);
    }
    if (filters.priceMax){
        query.where('price').lte(filters.priceMax);
    }
    query.limit(limit);
    query.skip(start)
    query.sort(sort)
    query.select('name sell price photo tags');
    return query.exec();
}

adSchema.statics.tagList = function(){
    const query = Ad.find({});
    query.select('tags');
    return query.exec();
}

const Ad = mongoose.model('Ad',adSchema);

module.exports = Ad;