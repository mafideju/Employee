const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys').secretOrKey;
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

router.get('/test', (req, res) => {
  return res.json({ msg: 'User tá rolando' })
})

// CRIAÇÃO DE UM NOVO USUÁRIO
router.post('/cadastro', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors)
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      errors.email = 'Este Email já está em uso.';
      return res.status(400).json(errors)
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // size
        r: 'pg', // rating
        d: 'mm' // imagem default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        avatar
      });

      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err))
        })
      })

    };
  }).catch(err => console.log(err))
})

// CADASTRAMENTO DA SENHA DO USUÁRIO
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors)
  }

  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        errors.email = 'Usuário Não Encontrado'
        return res.status(404).json(errors)
      }

      bcrypt
        .compare(req.body.password, user.password)
        .then(isMatch => {
          if (isMatch) {
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }
            // TOKEN CREATION
            jwt.sign(payload, keys, { expiresIn: 3600 }, (err, token) => {
              res.json({
                token: 'Bearer ' + token
              })
            });

          } else {
            errors.password = 'Senhas Incompatíveis'
            return res.status(400).json(errors)
          }
        })
    }).catch(err => console.log(err))
});

// VALIDAÇÃO DA AUTENTICAÇÃO DO USUÁRIO
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    })
  });

module.exports = router;