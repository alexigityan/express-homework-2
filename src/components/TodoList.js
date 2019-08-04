import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'reactjs-simple-spinner';
import TodoContainer from './TodoContainer';


class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    if (this.props.isLoading) {
      return <div className="TodoList"> <Spinner /> </div>
    }
    
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
  todos: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default TodoList;