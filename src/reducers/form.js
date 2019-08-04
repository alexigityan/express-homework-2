
import { 
  EDIT_MODE_ON,
  EDIT_MODE_OFF,
  SET_ADD_TEXT,
  SET_EDIT_TEXT,
  SET_EDIT_ID
} from '../actions/actionTypes';

const initialState = {
  isEditModeOn: false,
  addText: '',
  editText: '',
  editId: null
}

export default function(state=initialState, action) {

  switch (action.type) {
    case EDIT_MODE_ON:
      return { ...state, isEditModeOn: true };

    case EDIT_MODE_OFF:
        return { ...state, isEditModeOn: false };

    case SET_ADD_TEXT:
      return { ...state, addText: action.text };

    case SET_EDIT_TEXT:
      return { ...state, editText: action.text };

    case SET_EDIT_ID:
      return { ...state, editId: action.id };

    default:
      return state;
  }
}