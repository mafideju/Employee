const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');;

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;


module.exports = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // para esse console.log funcionar, é necessário inserir um bearer válido
    // no get request(Authorization) para a rota do usuário pos login
    // console.log(jwt_payload)

    User
      .findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch(err => console.log(err))
  }));
}