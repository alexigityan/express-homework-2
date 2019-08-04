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
    const { addTodo, addText, setAddText } = this.props;

    return (
      <form className="AddForm" onSubmit={(e)=>addTodo(e, addText)} >
        <input 
          type="text" 
          value={addText} 
          onChange={(e)=>setAddText(e.target.value)}
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



