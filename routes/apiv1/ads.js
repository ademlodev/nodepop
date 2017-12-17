"use strict";

var express = require('express');
var router = express.Router();

//Cargar el modelo del anuncio
const Ad = require('../../db/models/Ad');
const jwtAuth = require('../../lib/jwtAuth')
const union = require('arr-union')

/**
 * Check autenticación en anuncios
 */
router.use(jwtAuth());

/**
 * / GET /ads
 * Devuelve todos los anuncios 
 */
router.get('/', async (req, res, next) => {
    try {
        const tags = req.query.tags;
        const sell = req.query.sell;
        const name = req.query.name;
        const price = req.query.price;
        
        const filter = {};
        const start = parseInt(req.query.start)
        const limit = parseInt(req.query.limit);
        const sort = req.query.sort;

        if (tags){
            filter.tags = tags;
        }
        if (sell){
            filter.sell = sell;
        }
        if (name){
            filter.name = new RegExp('^' + name, "i");
        }
        if (price){
            //comprobamos como se indica el precio
            if (price.indexOf('-') === -1){
                //nos filtra por un unico precio
                filter.price = price;
            }else{
                const prices = price.split('-');
                console.log(prices)
                filter.priceMin = prices[0];
                filter.priceMax = prices[1];
            }
        }

        const rows = await Ad.list(filter, start, limit, sort);
        res.json({ success: true, result: rows });
    } catch(err) {
        err.message = 'notFoundAds'
        err.status = 404
        next(err);
    }
});


/**
 * / GET /tags
 * Devuelve todos los tags 
 */
router.get('/tags', async (req, res, next) => {
    try {
        const rows = await Ad.tagList();

        let tag = new Array();
        for (let i=0; i < rows.length; i++){
            tag = union(tag, rows[i].tags);
        }

        res.json({ success: true, result: tag });
    } catch(err) {
        console.log(err);
        err.message = 'notFoundTags'
        err.status = 404
        next(err);
    }
});

module.exports = router;