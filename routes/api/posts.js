const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const Post = require('../../models/Posts');
const Profile = require('../../models/Profile');
const validatePostInput = require('../../validation/posts');


router.get('/test', (req, res) => res.json({ msg: 'posts tá rolando' }))

router.get('/', (req, res) => {
  Post
    .find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'Erro Interno = Lista de Postagem Não Encontrada' }))
});

router.get('/:id', (req, res) => {
  Post
    .findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ nopostfound: 'Erro Interno = Postagem Não Encontrada' }))
});


router.post('/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) res.status(400).json(errors)

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost
      .save()
      .then(post => {
        res.json(post);
      })
  });

router.post('/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOne({ user: req.user.id })
      .then(() => {
        Post
          .findById(req.params.id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
              return res
                .status(400)
                .json({ notliked: 'Nem deu like aí!!' })
            }
            const removeIndex = post.likes
              .map(item => item.user.toString())
              .indexOf(req.user.id)


            post.likes.splice(removeIndex, 1);
            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postnotfound: 'Postagem Não Encontrada' }))
      })
  });

router.post('/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        Post
          .findById(req.params.id)
          .then(post => {
            if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
              return res
                .status(400)
                .json({ alreadyliked: 'Já deu like aí!! LikeAttack?? Nope.' })
            }
            post.likes.unshift({ user: req.user.id });

            post.save().then(post => res.json(post));
          })
          .catch(err => res.status(404).json({ postnotfound: 'Postagem Não Encontrada' }))
      })
  });

router.post('/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    if (!isValid) res.status(400).json(errors);
    Post
      .findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        }
        post.comments.unshift(newComment)
        post.save().then(post => res.json(post))
      })
      .catch(() => res.status(404).json({ postnotfound: 'Postagem Não Encontrada' }))
  });

router.delete('/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post
      .findById(req.params.id)
      .then(post => {
        if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
          return res.status(404).json({ commentnotexists: 'Comentário não Encontrado' })
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id)

        post.comments.splice(removeIndex, 1)
        post.save().then(post => res.json(post))
      })
      .catch(() => res.status(404).json({ postnotfound: 'Postagem Não Encontrada' }))
  });


// DELETE POSTAGEM
router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Profile
      .findOne({ user: req.user.id })
      .then(profile => {
        Post
          .findById(req.params.id)
          .then(post => {
            if (post.user.toString() !== req.user.id) {
              return res.status(401).json({ noauthorized: 'Ação Não Autorizada' })
            }
            post
              .remove()
              .then(() => res.json('Postagem Removida com Sucesso'))
              .catch(err => res.status(404).json({ noauthorized: 'Remoção da Postagem Travada aos 45 do Segundo Tempo' }))
          })
          .catch(err => res.status(404).json({ postnotfound: 'Postagem Não Encontrada' }))
      })
  });

module.exports = router;