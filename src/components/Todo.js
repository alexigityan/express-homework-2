import React from 'react';

const Todo = props => {

  return (
    <div className="Todo">
      <p className="todo-text">{props.text}</p>
      <button onClick={() => props.editTodo(props._id, props.text)}>Edit</button>
      <button onClick={() => props.deleteTodo(props._id)}>Delete</button>
    </div>
  )

}

export default Todo;