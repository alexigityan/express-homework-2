const express = require('express');

const api = express.Router();
api.use(express.json());

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let { todoList } = res.locals;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  todoList.delete(id)
    .then(() => todoList.list())
    .then( todos => res.json(todos))
    .catch( err => console.log(err) );    
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todoList } = res.locals;
  const { newTodo } = req.body;

  if (!id || !newTodo) {
    res.sendStatus(400);
    return;
  }

  todoList.edit(id, newTodo)
    .then(() => todoList.list())
    .then( todos => res.json(todos))
    .catch( err => console.log(err) );    
});

module.exports = api;