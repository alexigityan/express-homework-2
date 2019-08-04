import { 
  SET_TODOS, 
  ADD_TODO, 
  DELETE_TODO, 
  EDIT_TODO,
  START_LOADING,
  FINISH_LOADING  
} from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  todosById: {},
};

export default function (state=initialState, action) {
  
  switch (action.type) {
    
    case SET_TODOS: {
      return { ...state, todosById: { ...action.todosById } };
    }

    case ADD_TODO: {
      const newTodo = { _id: action._id, text: action.text };
      return { ...state, todosById: {...state.todosById, [newTodo._id]: newTodo } };
    }

    case DELETE_TODO: {
      const newTodosById = { ...state.todosById };
      delete newTodosById[action._id];
      return { ...state, todosById: newTodosById };
    }

    case EDIT_TODO: {
      const editedTodo = { _id: action._id, text: action.text };
      return { ...state, todosById: { ...state.todosById, [action._id]: editedTodo } };
    }

    case START_LOADING: {
      return { ...state, isLoading: true };
    }

    case FINISH_LOADING: {
      return { ...state, isLoading: false };
    }

    default:
      return state;
  }
}