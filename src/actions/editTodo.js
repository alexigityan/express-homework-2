export default function (id, text) {
  return function (dispatch) {
    fetch (`/api/todos/${id}`, { 
      method: 'put', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify({ newText: text }) 
    })
    .then(res => res.ok ? res.json() : console.log(res))
    .then(editedTodo => dispatch({ type:'EDIT_TODO', editId: editedTodo._id, editText: editedTodo.text }));
  }
}

