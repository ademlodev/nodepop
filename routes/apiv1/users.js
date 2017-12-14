"use strict";

var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const shajs = require('sha.js')
const sha256 = shajs(process.env.HASH)
const User = require('../../db/models/User')
/**
 * POST /register
 * Crea un usuario
 */
router.post('/register', function(req, res, next) {
  let user = new User(req.body);
  
  user.password = sha256.update(user.password).digest('hex')
  user.save((err, userSaved) =>{
    if (err){
      next(err);
      return;
    }

    res.json({ success: true, result: userSaved });
  })
});

router.post('/autheticate', function(req, res, next) {
  // recogemos credenciales
  const userName = req.body.username;
  console.log(req.body.password);
  const password = sha256.update(req.body.password).digest('hex');
  console.log(password);

  // Buscamos en la base de datos
  User.findOne({email: userName}).exec(function(err, user) {
    if (err) {
          return next(err);
      }
      
      // si encontramos el usuario
      if (!user) {
          return res.json({success: false, error: 'Usuario no encontrado'});
      }

      // comprobamos su password
      if (password !== user.password) {
          return res.json({success: false, error: 'Password incorrecta'});
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
        res.json({success: true, token});
      });
  });
});

module.exports = router;
