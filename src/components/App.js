import React, { Component } from 'react';

import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import TodoList from './TodoList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      editMode: false,
      editId: '',
      editText: '',
      addText: ''
    }

    this.setAppState = this.setAppState.bind(this);
  }

  componentDidMount() {
    fetch('/api/todos')
    .then( res => res.ok && res.json() )
    .then( todos => this.setAppState('todos', todos) )
    .catch( err => console.log(err) );
  }

  setAppState(prop, value) {
    this.setState({ [prop]: value })
  }

  render() {
    return (
      <div className="App">
        <h1>Todo App</h1>
          { this.state.editMode ? 
            <EditTodo setAppState={this.setAppState} editId={this.state.editId} editText={this.state.editText} /> : 
            <AddTodo setAppState={this.setAppState} addText={this.state.addText} /> 
          }
          <TodoList todos={this.state.todos} setAppState={this.setAppState} />
      </div>
    )
  }

} 

export default App;