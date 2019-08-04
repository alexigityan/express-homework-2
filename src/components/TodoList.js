import React from 'react';

import TodoContainer from './TodoContainer';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    return (
      <div className="TodoList">
        { this.props.todos.map( ({ text, _id }) => { 
          return <TodoContainer key={_id} text={text} _id={_id} /> ;
        })}
      </div>
    )
  }

}

export default TodoList;