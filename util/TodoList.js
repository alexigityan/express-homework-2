const Todo = require('../db/models/todo');

class TodoList {
  constructor(userId) {
    this.userId = userId;
  }

  getTodos() {
    return Todo.find({ owner: this.userId });
  }

  add(todo) {    
    return Todo.create({ text: todo, owner: this.userId });
  }

  delete(_id) {
    return Todo.findOneAndDelete({ _id });
  }

  edit(_id, text) {
    return Todo.findOneAndUpdate({ _id }, { text });
  } 
}


module.exports = TodoList;