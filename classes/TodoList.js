const Todo = require('../db/models/todo');

class TodoList {
  constructor(userId) {
    this.userId = userId;
  }

  getTodos() {
    return Todo.find({ owner: this.userId }, { owner: 0 });
  }

  add(text) {    
    return Todo.create({ text, owner: this.userId });
  }

  delete(_id) {
    return Todo.findOneAndDelete({ _id, owner: this.userId });
  }

  edit(_id, text) {
    return Todo.findOneAndUpdate({ _id, owner: this.userId }, { text }, { new: true });
  } 
}


module.exports = TodoList;