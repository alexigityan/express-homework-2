import { connect } from 'react-redux'

import Todo from './Todo'

import deleteTodo from '../actions/deleteTodo';

const mapDispatch = dispatch => ({
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  setEditId: (id) => dispatch({ type: 'SET_EDIT_ID', id }),
  setEditText: (text) => dispatch({ type: 'SET_EDIT_TEXT', text }),
  openEditor: () => dispatch({ type: 'EDIT_MODE_ON' })
});

const assignKey = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...dispatchProps,
  key: ownProps._id
})

export default connect(null, mapDispatch, assignKey)(Todo);