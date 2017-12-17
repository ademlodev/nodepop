"use strict";

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var hash = require('hash.js')
const User = require('../../db/models/User')

/**
 * POST /register
 * Crea un usuario
 */
router.post('/register', function(req, res, next) {
  req.body.password = hash.sha256().update(req.body.password).digest('hex')
  let user = new User(req.body);
  
  user.save((err, userSaved) =>{
    if (err){
      next(err);
      return;
    }

    res.json({ success: true, result: userSaved });
  })
});

/**
 * POST /autheticate
 * Autentica a un usuario
 */
router.post('/autheticate', function(req, res, next) {
  // recogemos credenciales
  const email = req.body.email;
  const password = hash.sha256().update(req.body.password).digest('hex');

  // Buscamos en la base de datos
  User.findOne({email: email}).exec(function(err, user) {
    if (err) {
      return next(err);
    }
      
    // si encontramos el usuario
    if (!user) {
      const err = new Error('userNotFound')
      err.status = 404  
      return next(err);
    }

    // comprobamos su password
    if (password !== user.password) {
      const err = new Error('incorrectPassword');
      err.status = 404
      return next(err);
    }

    // creamos un token
    jwt.sign({ user_id: user._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN
    }, function(err, token) {
      if (err){
        next(err);
        return;          
      }  
      // respondemos al usuario dándole el token
      res.json({success: true, result: token});
    });
  });
});

module.exports = router;
