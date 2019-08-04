import { ADD_TODO, START_LOADING, FINISH_LOADING } from './actionTypes';

export default function (text) {
  return function (dispatch) {
    dispatch({ type: START_LOADING });
    fetch ('/api/todos', { 
      method: 'post', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify({ newTodo: text }) 
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw 'Failed to add Todo';
      })
      .then(({ _id, text }) => {
        dispatch({ type: ADD_TODO, _id, text }); 
        dispatch({ type: FINISH_LOADING });
      })
      .catch( err => {
        console.log(err);
        dispatch({ type: FINISH_LOADING });
      })
  }
}

