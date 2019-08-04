import { connect } from 'react-redux';

import TodoList from './TodoList';

import fetchTodos from '../actions/fetchTodos';

const mapState = ({ todos }) => ({ 
  todos: Object.values(todos.todosById) 
});

const mapDispatch = dispatch => ({ fetchTodos: () => dispatch(fetchTodos()) });

export default connect(mapState, mapDispatch)(TodoList);