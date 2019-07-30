const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const generateId = require('../util/generateId');
const TodoList = require('../util/TodoList');
const api = require('./api');

require('../db');

const app = express();

app.locals.users = {};

app.set('view engine', 'pug');

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.use( (req, res, next) => {
  const { users } = app.locals;
  const { uid } = req.cookies;
  const userId = (uid && users[uid]) ? uid : generateId();

  res.cookie('uid', userId, {
    maxAge: 7*24*60*60*1000 // cookie expires in a week
  });

  if (!users[userId]) {
    users[userId] = new TodoList();
  }
  
  res.locals.todoList = users[userId];
  next();
});

app.use('/api', api);

app.route('/')
  .get((req, res) => {
    const { todoList } = res.locals;
    res.render('index', { todos: todoList.list });  
  })
  .post((req, res) => {
    const { todoList } = res.locals;
    const { todo } = req.body;

    if (!todo) {
      res.sendStatus(400);
      return;
    }

    todoList.add(todo);
    res.render('index', { todos: todoList.list });  
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});