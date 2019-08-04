import React from 'react';

const Todo = ({ _id, text, editTodo, deleteTodo }) => {

  return (
    <div className="Todo">
      <p className="todo-text">{text}</p>
      <button onClick={() => editTodo(_id, text)}>Edit</button>
      <button onClick={() => deleteTodo(_id)}>Delete</button>
    </div>
  )

}

export default Todo;