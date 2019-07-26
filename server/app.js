const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const generateId = require('../util/generateId');
const TodoList = require('../util/TodoList');
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
  const userId = (uid && todos[uid]) ? uid : generateId();

  res.cookie('uid', userId, {
    maxAge: 7*24*60*60*1000 // cookie expires in a week
  });

  if (!todos[userId])
    todos[userId] = new TodoList();
  
  res.locals.todoList = todos[userId];
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

    if (!todo) 
      res.sendStatus(400);

    todoList.add(todo);
    res.render('index', { todos: todoList.list });  
  });

app.get('/edit', (req, res)=>{
  res.render('edit');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});