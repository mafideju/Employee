const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/exp');
const validateEducationInput = require('../../validation/education');
const router = express.Router();

// USER CURRENT PROFILE
router.get('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    let errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "Não Há Perfil Criado para este Usuário";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => console.log(err));
  });

// GET UNICO USUARIO POR HANDLE OU ID (DUAS ABAIXO)
router.get('/usuario/:handle', (req, res) => {
  const errors = {};
  Profile
    .findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Não há perfil criado para este usuário."
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => console.log(err))
});
router.get('/user/:user_id', (req, res) => {
  const errors = {};
  Profile
    .findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "Não há perfil criado para este usuário."
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => console.log(err))
});

// LISTA GERAL
router.get('/all', (req, res) => {
  const errors = {};
  Profile
    .find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = 'Não há perfis...'
        return res.status(404).json(errors);
      }
      res.json(profiles)
    })
    .catch(err => console.log(err))
});

// CRIAR PERFIL
router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    let profileFields = {};
    profileFields.user = req.user.id;

    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubuser) profileFields.githubuser = req.body.githubuser;

    if (typeof req.body.skills !== 'undefined') {
      profileFields.skills = req.body.skills.split(',')
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {

          // EDITAR
          Profile
            .findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile))
        } else {
          // CRIAR

          // HANDLE CHECK
          Profile
            .findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = "Handle em Uso";
                res.status(400).json(errors);
              }
            })
          // SALVAR
          new Profile(profileFields)
            .save()
            .then(profile => res.json(profile))
            .catch(err => console.log('PROFILE ERROR', err))
        }
      })
      .catch(err => console.log(err))
  });

// CRIAR EXPERIENCIA
router.post('/experiencia',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) res.status(400).json(errors);

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        const newExp = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.experience.unshift(newExp)
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err))
      })
  });

// CRIAR FORMAÇÃO
router.post('/formacao',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) res.status(400).json(errors)

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        const newEdu = {
          institution: req.body.institution,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        }
        profile.education.unshift(newEdu)
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err))
      })
  });

// DELETE EXPERIENCIA
router.delete('/experiencia/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id)
        profile.experience
          .splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err))
      })
  });

// DELETE EDUCATION
router.delete('/formacao/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id)
        profile.education
          .splice(removeIndex, 1);
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => console.log(err))
      })
  });


// DELETE TUDO
router.delete('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOneAndRemove({ user: req.user.id })
      .then(profile => {
        User.findOneAndRemove({ _id: req.user.id })
          .then(() => {
            return res.json({ success: true })
          })
      })
  });

module.exports = router;