import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <form className="EditForm" onSubmit={(e)=> this.props.editTodo(e, this.props.editId, this.props.editText) }>
        <input 
          type="text" 
          value={this.props.editText} 
          onChange={(e)=>this.props.setEditText(e.target.value)}
          placeholder="New text"
          ref={this.inputRef}
        />
        <input type="submit" value="Save changes" />
        <button onClick={this.props.closeEditor}>Close Editor</button> 
      </form>
    )
  }
}

EditForm.propTypes = {
  editText: PropTypes.string.isRequired,
  setEditText: PropTypes.func.isRequired, 
  editId: PropTypes.string.isRequired,
  editTodo: PropTypes.func.isRequired,
  closeEditor: PropTypes.func.isRequired
};

export default EditForm;