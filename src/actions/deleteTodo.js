import { DELETE_TODO, START_LOADING, FINISH_LOADING } from './actionTypes';

export default function (id) {
  return function (dispatch) {
    dispatch({ type: START_LOADING });
    fetch (`/api/todos/${id}`, { method: 'delete' }) 
      .then(res => { 
        if (res.ok) {
          return res.json();
        }
        throw 'Failed to delete Todo: try refreshing the app';
      })
      .then(({ _id }) => {
        dispatch({ type: DELETE_TODO, _id });
        dispatch({ type: FINISH_LOADING });
      })
      .catch( err => {
        console.log(err);
        dispatch({ type: FINISH_LOADING });
      })
  }
}

