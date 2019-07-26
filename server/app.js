const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const generateId = require('../util/generateId');
const api = require('./api');

const app = express();

app.locals.todos = {};

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use( (req, res, next) => {
  const { todos } = app.locals;
  const { uid } = req.cookies;
  const userId = (uid && todos.uid) ? uid : generateId();

  res.cookie('uid', userId, {
    maxAge: 7*24*60*60*1000 // cookie expires in a week
  });
  todos.uid = [];
  res.locals.userId = userId;
  next();
});

app.use('/api', api);

app.get('/', (req, res)=>{
  res.render('index');
});

app.get('/edit', (req, res)=>{
  res.render('edit');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});