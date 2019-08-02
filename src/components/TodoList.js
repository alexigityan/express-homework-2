import React from 'react';

import Todo from './Todo';

const TodoList = props => {
  return (
    <div className="TodoList">
      { props.todos.map( ({ text, _id }) => { 
        return <Todo key={_id} text={text} id={_id} setAppState={props.setAppState} /> ;
      })}
    </div>
  )
}

export default TodoList;