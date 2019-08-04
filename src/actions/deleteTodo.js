import fetchTodos from './fetchTodos';

export default function (id) {
  return function (dispatch) {
    fetch (`/api/todos/${id}`, { method: 'delete' }) 
    .then(res => { 
      if (res.ok) {
        return res.json();
      }
      throw { status: res.status, statusText: res.statusText };
    })
    .then(({ _id }) => dispatch({ type:'DELETE_TODO', _id }))
    .catch(err => err.status === 404 ? dispatch(fetchTodos()) : console.log(err.statusText));
  }
}

