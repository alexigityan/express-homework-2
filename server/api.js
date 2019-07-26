const express = require('express');

const api = express.Router();
api.use(express.json());

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = req.app.locals.todos[res.locals.userId];

  if (!id || !todos.includes(id)) 
    res.sendStatus(400);

  todos.delete(id);
  res.json(todos.list);  
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todos = req.app.locals.todos[res.locals.userId];
  const { newTodo } = req.body;

  if (!id || !newTodo || !todos.includes(id)) 
    res.sendStatus(400);

  todos.edit(id, newTodo);
  res.json(todos.list);  
});

module.exports = api;