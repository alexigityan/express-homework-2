const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const generateId = require('../util/generateId');
const TodoList = require('../util/TodoList');
const api = require('./api');

const connectToDb = require('../db/connect');
connectToDb();

const app = express();

app.set('view engine', 'pug');

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

app.route('/')
  .get((req, res) => {
    const { todoList } = res.locals;
    todoList.getTodos()
      .then( todos => res.render('index', { todos }) )
      .catch( err => console.log(err) );     
  })
  .post((req, res) => {
    const { todoList } = res.locals;
    const { todo } = req.body;

    if (!todo) {
      res.sendStatus(400);
      return;
    }

    todoList.add(todo)
      .then( () => todoList.getTodos())    
      .then( todos => res.render('index', { todos }) )
      .catch( err => console.log(err) );
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});