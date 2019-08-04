export default function (id) {
  return function (dispatch) {
    fetch (`/api/todos/${id}`, { method: 'delete' }) 
    .then(res => res.ok ? res.json() : console.log(res))
    .then(({ _id }) => dispatch({ type:'DELETE_TODO', _id }));
  }
}

