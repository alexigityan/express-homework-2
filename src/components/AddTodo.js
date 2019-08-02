import React, { Component } from 'react';


class AddTodo extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleChange(e) {
    this.props.setAppState('addText', e.target.value);
  }

  clearInput() {
    this.props.setAppState('addText', '');
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.props.addText) {
      return;
    }
  
    fetch('/api/todos', {
      method: 'post',
      body: JSON.stringify({ newTodo: this.props.addText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then( res => res.ok && res.json() )
      .then( todos => {this.props.setAppState('todos', todos); this.clearInput()} )
      .catch( err => console.log(err) );
  }

  render() {
    return (
      <form className="AddTodo" onSubmit={this.handleSubmit}>
        <input 
          type="text" 
          value={this.props.addText} 
          onChange={this.handleChange}
          placeholder="Add new todo"
          ref={this.inputRef}
        />
        <input type="submit" value="Add" /> 
      </form>
    )
  }

} 

export default AddTodo;