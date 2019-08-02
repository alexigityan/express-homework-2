import React, { Component } from 'react';

class Todo extends Component {

  constructor(props) {
    super(props);

    this.deleteTodo = this.deleteTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
  }

  deleteTodo() {
    fetch(`/api/todos/${this.props.id}`, { method: 'delete' })
    .then( res => res.ok && res.json() )
    .then( todos => this.props.setAppState('todos', todos) )
    .catch( err => console.log(err) );
  }

  editTodo() {
    const { id, text, setAppState } = this.props;
    setAppState('editId', id);
    setAppState('editText', text);
    setAppState('editMode', true);
  }

  render() {
    return (
      <div className="Todo">
        <p className="todo-text">{this.props.text}</p>
        <button onClick={this.editTodo}>Edit</button>
        <button onClick={this.deleteTodo}>Delete</button>
      </div>
    )
  }

}

export default Todo;