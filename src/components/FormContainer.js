import { connect } from 'react-redux';

import Form from './Form';

import addTodo from '../actions/addTodo';
import editTodo from '../actions/editTodo';
import { 
  EDIT_MODE_OFF,
  SET_ADD_TEXT,
  SET_EDIT_TEXT  
} from '../actions/actionTypes';


const mapState = ({ form }) => ({
  isEditModeOn: form.isEditModeOn,
  addText: form.addText,
  editText: form.editText,
  editId: form.editId
});

const mapDispatch = dispatch => ({

  addTodo: (event, text) => {
    event.preventDefault();
    if (text) {
      dispatch(addTodo(text));
      dispatch({ type: SET_ADD_TEXT, text: '' });
    } 
  },

  editTodo: (event, id, newText) => {
    event.preventDefault();
    if (newText) {
      dispatch(editTodo(id, newText));
      dispatch({ type: SET_EDIT_TEXT, text: '' });
      dispatch({ type: EDIT_MODE_OFF });
    }
  },

  setAddText: (text) => dispatch({ type: SET_ADD_TEXT, text }),
  setEditText: (text) => dispatch({ type: SET_EDIT_TEXT, text }),
  closeEditor: () => dispatch({ type: EDIT_MODE_OFF })
});

export default connect(mapState, mapDispatch)(Form);