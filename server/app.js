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
  const userId = (uid && todos[uid]) ? uid : generateId();

  res.cookie('uid', userId, {
    maxAge: 7*24*60*60*1000 // cookie expires in a week
  });
  if (!todos[userId]) {
    todos[userId] = [];
    console.log(todos[userId]);
    Array.prototype.addTodo = function(todo) {
      if (!this.freeId) {
        this.freeId = 1;
      }
      this.push({ id: this.freeId++, text: todo });
    }
  }
  
  res.locals.todos = todos[userId];
  next();
});

app.use('/api', api);

app.route('/')
  .get((req, res) => {
    console.log(app.locals.todos);
    res.render('index');  
  })
  .post((req, res) => {
    const { todos } = res.locals;
    const { todo } = req.body;

    if (!todo) 
      res.sendStatus(400);

    todos.addTodo(todo);
    res.render('index');  
  });

app.get('/edit', (req, res)=>{
  res.render('edit');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Express listening on ${port}`);
});