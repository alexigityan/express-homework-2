import { 
  SET_TODOS, 
  ADD_TODO, 
  DELETE_TODO, 
  EDIT_TODO  
} from '../actions/actionTypes';

const initialState = {
  todosById: {},
};

export default function (state=initialState, action) {
  
  switch (action.type) {
    
    case SET_TODOS: {
      return { todosById: action.todosById };
    }

    case ADD_TODO: {
      const newTodo = { _id: action._id, text: action.text };
      return { todosById: {...state.todosById, [newTodo._id] :newTodo } };
    }


    case DELETE_TODO: {
      const newTodosById = { ...state.todosById };
      delete newTodosById[action._id];
      return { todosById: newTodosById };
    }

    
    case EDIT_TODO: {
      const newTodosById = { ...state.todosById };
      if (newTodosById[action._id]) {
        newTodosById[action._id].text = action.text;
      }
      return { todosById: newTodosById }
    }


    default:
      return state;
  }
}