/* Config files */
const dotenv = require('dotenv');
dotenv.config();
const config = require('../config').app;

/* Core modules */
const path = require('path');

/* Express modules */
const express = require('express');
const session = require('express-session');

/* Database modules */
const connectDb = require('../db/connect');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

/* Models */
const User = require('../db/models/user');

/* Classes and helper functions */
const TodoList = require('../classes/TodoList');

/* Routes */
const api = require('./api');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: config.secret,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false
}));

app.use( (req, res, next) => {

  if (req.path === '/login' || req.path === '/register') {
    next();
    return;
  }

  if (!req.session.authorized) {
    res.redirect('/login');
    return;
  }

  res.locals.todoList = new TodoList(req.session.userId);
  next();

});

app.use(express.static(path.join(__dirname, '../public'), { extensions: ['html'] }));

app.use('/api', api);

app.post('/login', ( req, res ) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.sendStatus(400);
    return;
  }

  User.login(name, password)
    .then( user => {
      if (user.err) {
        res.send(user.err);
        return;
      }

      req.session.authorized = true;
      req.session.userId = user._id;
      res.redirect('/');
      return;

    })

});

app.post('/register', ( req, res ) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.sendStatus(400);
    return;
  }

  User.register( name, password )
    .then( user => {
      if (user.err) {
        res.send(user.err);
        return;
      }

      res.sendStatus(200);
    })
    .catch( e => console.log(e));

});

connectDb()
  .then( () => {
    console.log('connected to mongodb');
    app.listen(config.port, () => {
      console.log(`Express listening on ${config.port}`);
    });
  })
  .catch( err => console.log(err));
