const Todo = require('../db/models/todo');

class TodoList {
  constructor(userId) {
    this.userId = userId;
  }

  list() {
    return Todo.find({ owner: this.userId });
  }

  add(todo) {    
    return Todo.create({ text: todo, owner: this.userId });
  }

  includes(id) {
    return Boolean(this.list.find( todo => todo.id.toString() === id));
  }

  delete(id) {
    this.list = this.list.filter( todo => todo.id.toString() !== id);
    if (this.list.length === 0) {
      this.freeId = 1;
    }
  }

  edit(id, newText) {
    this.list = this.list.map( todo => {
      if (todo.id.toString() === id) {
        return { id: todo.id, text: newText };
      }
      return todo;      
    });
  } 
}


module.exports = TodoList;