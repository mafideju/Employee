const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 7007;

// ROUTES
const users = require('./routes/api/users');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');

// MIDDLEWARES (ATIVA O USO)
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// JWT/PASSPORT STRATEGY
require('./config/passport')(passport)

// DB
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true
  })
  .then(() => console.log('Mongoose Rodando na Porta 27017'))
  .catch(err => console.log(err));

// SERVER
app.listen(port, () => console.log(`Servidor Rodando na Porta ${port}`)); 