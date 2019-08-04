import { connect } from 'react-redux';

import Todo from './Todo';

import deleteTodo from '../actions/deleteTodo';
import { SET_EDIT_ID, SET_EDIT_TEXT, EDIT_MODE_ON } from '../actions/actionTypes';

const mapDispatch = dispatch => ({
  deleteTodo: (id) => dispatch(deleteTodo(id)),

  editTodo: (id, text) => {
    dispatch({ type: SET_EDIT_ID, id });
    dispatch({ type: SET_EDIT_TEXT, text });
    dispatch({ type: EDIT_MODE_ON });
  }
  
});

const assignKey = (_, dispatchProps, ownProps) => ({
  ...ownProps,
  ...dispatchProps,
  key: ownProps._id
});

export default connect(null, mapDispatch, assignKey)(Todo);