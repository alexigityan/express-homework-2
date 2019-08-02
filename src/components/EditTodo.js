import React, { Component } from 'react';


class EditTodo extends Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.closeEditor = this.closeEditor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleChange(e) {
    this.props.setAppState('editText', e.target.value);
  }

  closeEditor() {
    const { setAppState } = this.props;
    setAppState('editId', '');
    setAppState('editText', '');
    setAppState('editMode', false);
  }

  handleSubmit(e) {
    e.preventDefault();

  if (!this.props.editText) {
    return;
  }

  fetch(`/api/todos/${this.props.editId}`, {
    method: 'put',
    body: JSON.stringify({ newText: this.props.editText }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then( res => res.ok && res.json() )
    .then( todos => {this.props.setAppState('todos', todos), this.closeEditor()} )
    .catch( err => console.log(err) );
  }


  render() {
    return (
      <form className="EditTodo" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          value={this.props.editText} 
          onChange={this.handleChange}
          placeholder="New todo value here"
          ref={this.inputRef}
        />
        <input type="submit" value="Edit" />
        <button onClick={this.closeEditor}>Close Editor</button> 
      </form>
    )
  }

} 

export default EditTodo;