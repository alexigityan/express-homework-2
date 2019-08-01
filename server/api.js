const express = require('express');

const api = express.Router();
api.use(express.json());

api.get('/todos/', (req, res) => {
  const { todoList } = res.locals;
  todoList.getTodos()
    .then( todos => res.json(todos) )
    .catch( err => (console.log(err), res.sendStatus(500)));     
})

api.post('/todos/',(req, res) => {
  const { todoList } = res.locals;
  const { newTodo } = req.body;

  if (!newTodo) {
    res.sendStatus(400);
    return;
  }

  todoList.add(newTodo)
    .then( () => todoList.getTodos())    
    .then( todos => res.json(todos) )
    .catch( err => (console.log(err), res.sendStatus(500)));     
});

api.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  let { todoList } = res.locals;

  if (!id) {
    res.sendStatus(400);
    return;
  }

  todoList.delete(id)
    .then(() => todoList.getTodos())
    .then( todos => res.json(todos))
    .catch( err => (console.log(err), res.sendStatus(500)));     
});

api.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todoList } = res.locals;
  const { newText } = req.body;

  if (!id || !newText) {
    res.sendStatus(400);
    return;
  }

  todoList.edit(id, newText)
    .then(() => todoList.getTodos())
    .then( todos => res.json(todos))
    .catch( err => (console.log(err), res.sendStatus(500)));     
});

module.exports = api;