const initialState = {
  todosById: {},
  allTodos: []
};

export default function (state=initialState, action) {
  
  switch (action.type) {
    
    case 'SET_TODOS': {
      return { todosById: action.todosById, allTodos: action.allTodos };
    }

    case 'ADD_TODO': {
      const newTodo = { _id: action._id, text: action.text };
      return { todosById: {...state.todosById, [newTodo._id] :newTodo }, allTodos: [...state.allTodos, newTodo._id] };
    }


    case 'DELETE_TODO': {
      const newTodosById = { ...state.todosById };
      delete newTodosById[action._id];
      const newAllTodos = Object.keys(newTodosById);
      return { todosById: newTodosById, allTodos: newAllTodos };
    }

    
    case 'EDIT_TODO': {
      const newTodosById = { ...state.todosById };
      if (newTodosById[action._id]) {
        newTodosById[action._id].text = action.text;
      }
      return { todosById: newTodosById, allTodos: [...state.allTodos] }
    }


    default:
      return state;
  }
}