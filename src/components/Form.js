import React from 'react';

const Form = (props) => {

  if (props.isEditModeOn) {
    return (
      <form className="EditTodo" onSubmit={(e)=> props.editTodo(e, props.editId, props.editText) }>
        <input 
          type="text" 
          value={props.editText} 
          onChange={(e)=>props.setEditText(e.target.value)}
          placeholder="New text"
        />
        <input type="submit" value="Save changes" />
        <button onClick={props.closeEditor}>Close Editor</button> 
      </form>
    )
  }

  return (
    <form className="AddTodo" onSubmit={(e)=>props.addTodo(e, props.addText)} >
      <input 
        type="text" 
        value={props.addText} 
        onChange={(e)=>props.setAddText(e.target.value)}
        placeholder="Add new todo"
      />
      <input type="submit" value="Add" /> 
    </form>
  )

} 

export default Form;