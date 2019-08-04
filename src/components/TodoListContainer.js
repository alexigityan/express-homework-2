import { connect } from 'react-redux';

import TodoList from './TodoList';

import fetchTodos from '../actions/fetchTodos';

const mapState = ({ todos }) => ({ todos: todos.allTodos.map( id => todos.todosById[id]) });

const mapDispatch = dispatch => ({ fetchTodos: () => dispatch(fetchTodos()) });

export default connect(mapState, mapDispatch)(TodoList);