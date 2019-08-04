import React from 'react';
import PropTypes from 'prop-types';

import TodoContainer from './TodoContainer';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {

    return (
      <div className="TodoList">
        { 
          this.props.todos.length > 0 ?
          
            this.props.todos.map( (todo) => { 
              return <TodoContainer key={`_${todo._id}`} { ...todo } /> ;
            }) :

            <h3>No Todos yet</h3>
        }
      </div>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TodoList;