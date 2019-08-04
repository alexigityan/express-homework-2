import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }


  render() {
    return (
      <form className="AddForm" onSubmit={(e)=>this.props.addTodo(e, this.props.addText)} >
        <input 
          type="text" 
          value={this.props.addText} 
          onChange={(e)=>this.props.setAddText(e.target.value)}
          placeholder="Add new todo"
          ref={this.inputRef}
        />
        <input type="submit" value="Add" /> 
      </form>
    )
  }

}

AddForm.propTypes = {
  addText: PropTypes.string.isRequired,
  setAddText: PropTypes.func.isRequired,
  addTodo: PropTypes.func.isRequired
};


export default AddForm;



