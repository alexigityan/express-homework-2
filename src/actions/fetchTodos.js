import { normalize, schema } from 'normalizr';

const todo = new schema.Entity('todos', undefined, { idAttribute: '_id' });

const mySchema = { todos: [todo] };

export default function () {
  return function (dispatch) {
    fetch ('/api/todos')
    .then(res => res.ok ? res.json() : console.log(res))
    .then( todos => {
        const normalized = normalize(todos, mySchema);
        return dispatch({ type:'SET_TODOS', todosById: normalized.entities.todos, allTodos: normalized.result.todos });
      });
  }
}

