const express = require('express');

const api = express.Router();
api.use(express.json());

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let { todoList } = res.locals;

  if (!id || !todoList.includes(id)) 
    res.sendStatus(400);

  todoList.delete(id);
  res.json(todoList.list);  
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todoList } = res.locals;
  const { newTodo } = req.body;

  if (!id || !newTodo || !todoList.includes(id)) 
    res.sendStatus(400);

  todoList.edit(id, newTodo);
  res.json(todoList.list);  
});

module.exports = api;