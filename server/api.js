const express = require('express');

const api = express.Router();

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todos } = res.locals;

  if (!id || !todos.find(todo => todo.id.toString() === id)) 
    res.sendStatus(400);

  todos = todos.filter(todo => todo.id.toString() !== id);
  res.setHeader(200);
  res.json(todos);  
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todos } = res.locals;
  const { newTodo } = req.body;

  if (!id || !newTodo || !todos.find(todo => todo.id.toString() === id)) 
    res.sendStatus(400);

  todos = todos.map(todo => {
    if(todo.id.toString() === id)
      return { id: todo.id, text: newTodo };
    else
      return todo;
  });
  res.setHeader(200);
  res.json(todos);  
});

module.exports = api;