

class TodoList {
  constructor() {
    this.list = [];
  }

  add(todo) {
    if (!this.freeId) {
      this.freeId = 1;
    }
    this.list.push({ id: this.freeId++, text: todo });
  }

  includes(id) {
    return Boolean(this.list.find( todo => todo.id.toString() === id));
  }

  delete(id) {
    this.list = this.list.filter( todo => todo.id.toString() !== id);
  }

  edit(id, newText) {
    this.list = this.list.map( todo => {
      if (todo.id.toString() === id) 
        return { id: todo.id, text: newText }
      else
        return todo
    });
  } 
}


module.exports = TodoList;