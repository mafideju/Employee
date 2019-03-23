const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const app = express();
const port = process.env.PORT || 7007;

// ROUTES
const users = require('./routes/users');
const posts = require('./routes/posts');
const profile = require('./routes/profile');

// MIDDLEWARES (ATIVA O USO)
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', users);
app.use('/posts', posts);
app.use('/profile', profile);

// JWT/PASSPORT STRATEGY
require('./config/passport')(passport)

// KEYS LOADER
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

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