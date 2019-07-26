const express = require('express');

const api = express.Router();
api.use(express.json());

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = req.app.locals.todos[res.locals.userId];

  if (!id || !todos.find(todo => todo.id.toString() === id)) 
    res.sendStatus(400);

  todos = req.app.locals.todos[res.locals.userId] = todos.filter(todo => todo.id.toString() !== id);
  res.json(todos);  
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = req.app.locals.todos[res.locals.userId];
  const { newTodo } = req.body;

  if (!id || !newTodo || !todos.find(todo => todo.id.toString() === id)) 
    res.sendStatus(400);

  todos = req.app.locals.todos[res.locals.userId] = todos.map(todo => {
    if(todo.id.toString() === id)
      return { id: todo.id, text: newTodo };
    else
      return todo;
  });
  res.json(todos);  
});

module.exports = api;