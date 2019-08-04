import { EDIT_TODO, START_LOADING, FINISH_LOADING } from './actionTypes';

export default function (id, text) {
  return function (dispatch) {
    dispatch({ type: START_LOADING });
    fetch (`/api/todos/${id}`, { 
      method: 'put', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify({ newText: text }) 
    })
      .then( res => {
        if (res.ok) {
          return res.json();
        }
        throw 'Failed to edit Todo: try refreshing the app';
      }) 
      .then( ({ _id, text }) => {
        dispatch({ type: EDIT_TODO, _id, text });
        dispatch({ type: FINISH_LOADING });
      })
      .catch( err => {
        console.log(err);
        dispatch({ type: FINISH_LOADING });
      })
  }
}

