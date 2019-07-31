/* Config files */
const dotenv = require('dotenv');
dotenv.config();
const config = require('../config').app;

/* Core modules */
const path = require('path');

/* Express modules */
const express = require('express');
const cookieParser = require('cookie-parser');

/* Database modules */
const connectDb = require('../db/connect');

/* Classes and helper functions */
const generateId = require('../helpers/generateId');
const TodoList = require('../classes/TodoList');

/* Routes */
const api = require('./api');

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use( (req, res, next) => {
  const { uid } = req.cookies;
  const userId = uid || generateId();

  res.cookie('uid', userId, {
    maxAge: 7*24*60*60*1000 // cookie expires in a week
  });

  res.locals.todoList = new TodoList(userId);
  next();
});

app.use('/api', api);

connectDb()
  .then( () => {
    console.log('connected to mongodb');
    app.listen(config.port, () => {
      console.log(`Express listening on ${config.port}`);
    });
  })
  .catch( err => console.log(err));
