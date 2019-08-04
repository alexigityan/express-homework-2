export default function (text) {
  return function (dispatch) {
    fetch ('/api/todos', { 
      method: 'post', 
      headers: { 'content-type': 'application/json' }, 
      body: JSON.stringify({ newTodo: text }) 
    })
      .then(res => res.ok ? res.json() : console.log(res))
      .then(newTodo => dispatch({ type:'ADD_TODO', newId: newTodo._id, newText: newTodo.text }));
  }
}

