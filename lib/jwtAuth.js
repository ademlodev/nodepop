"use strict";

const jwt = require('jsonwebtoken');

// Middleware de autenticación
module.exports = () =>{
    return function(req, res, next) {
        // recoger el token
        const token = req.body.token ||
            req.query.token ||
            req.get('x-access-token');

        if (!token) {
            const err = new Error('No token provided');
            err.status = 401;
            return next(err);
        }

        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (err) {
                return next(new Error('Invalid token'));
            }
            req.user_id = decoded.user_id;
            next();
        });
    }
};