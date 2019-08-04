import { SET_TODOS, START_LOADING, FINISH_LOADING } from './actionTypes';
import { normalize, schema } from 'normalizr';

const todo = new schema.Entity('todos', {}, { idAttribute: '_id' });

const mySchema = { todos: [todo] };

export default function () {
  return function (dispatch) {
    dispatch({ type: START_LOADING });
    fetch ('/api/todos')
      .then( res => {
        if (res.ok) {
          return res.json();
        }
        throw 'Failed to fetch Todos'; 
      })
      .then( todos => {
          const normalized = normalize(todos, mySchema);
          dispatch({ type: SET_TODOS, todosById: normalized.entities.todos });
          dispatch({ type: FINISH_LOADING });
      })
      .catch( err => {
        console.log(err);
        dispatch({ type: FINISH_LOADING });
      })
  }
}

