import React from 'react';

const Todo = props => {

  return (
    <div className="Todo">
      <p className="todo-text">{props.text}</p>
      <button onClick={() => {props.openEditor(); props.setEditId(props._id); props.setEditText(props.text)}}>Edit</button>
      <button onClick={() => props.deleteTodo(props._id)}>Delete</button>
    </div>
  )

}

export default Todo;