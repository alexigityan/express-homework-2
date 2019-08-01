
const state = {
  showEditForm: false,
  todos: []
}

/* Components */

const heading = (text) => {
  const heading = document.createElement('h1');
  heading.innerText = text;
  return heading;
};

const form = (submitHandler) => {
  const form = document.createElement('form');
  form.addEventListener('submit', submitHandler);
  return form;
} 

const newTodoForm = () => form(postNewTodo);

const editForm = () => form(submitEditValue);

const textInput = (changeHandler, value='', isFocused=false) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.value = value;
  input.addEventListener('change', changeHandler);
  if (isFocused) {
    state.focusedNode = input;
  }
  return input;
}

const button = (type, text, clickHandler) => {
  const button = document.createElement('button');
  button.type = type;
  button.innerText = text;
  if (clickHandler) {
    button.addEventListener('click', clickHandler);
  }
  return button;
}

const todoList = () => {
  const todoList = document.createElement('div');
  todoList.className = 'todo-list';
  return todoList;
}

const todoRow = () => {
  const todoRow = document.createElement('div');
  todoRow.className = 'todo-row';
  return todoRow;
}

const todoText = (text) => {
  const todoText = document.createElement('p');
  todoText.innerText = text;
  return todoText;
}

const populatedTodoRows = () => {
  return state.todos.map( todo => (
    { node: todoRow(), children: [
      { node: todoText(todo.text) },
      { node: button('button', 'Edit', ((id, text) => () => showEditor(id, text))(todo._id, todo.text)) },
      { node: button('button', 'Delete', (id => () => deleteTodo(id))(todo._id)) }
    ]}));
}



/* Fetch functions */

function getTodos() {
  fetch('/api/todos')
    .then( res => res.json() )
    .then( todos => {
      state.todos = todos;
      renderTodoApp();
    })
    .catch( err => console.log(err) );
}

function postNewTodo(e) {
  e.preventDefault();

  if (!state.newTodo) {
    return;
  }

  fetch('/api/todos', {
    method: 'post',
    body: JSON.stringify({ newTodo: state.newTodo }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then( res => res.json() )
    .then( todos => {
      state.todos = todos;
      state.newTodo = '';
      renderTodoApp();
    })
    .catch( err => console.log(err) );
}

function submitEditValue(e) {
  e.preventDefault();

  if (!state.editText) {
    return;
  }

  fetch(`/api/todos/${state.editId}`, {
    method: 'put',
    body: JSON.stringify({ newText: state.editText }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then( res => res.json() )
    .then( todos => {
      state.todos = todos;
      closeEditor();
    })
    .catch( err => console.log(err) );
}

function deleteTodo(id) {
  fetch(`/api/todos/${id}`, { method: 'delete' })
    .then( res => res.json() )
    .then( todos => {
      state.todos = todos;
      renderTodoApp();
    })
    .catch( err => console.log(err) );
}



/* State modifiers */

function showEditor(id, text) {
  state.showEditForm = true;
  state.editText = text;
  state.editId = id;
  renderTodoApp();
}

function closeEditor() {
  state.editText = '';
  state.editId = '';
  state.showEditForm = false;
  renderTodoApp();
}

function saveNewTodo(e) {
  state.newTodo = e.target.value;
}

function saveEditText(e) {
  state.editText = e.target.value;
}


/* Render functions */

function renderDom( parent, pseudodom ) {
  while( parent.childNodes.length > 0 ) {
    parent.childNodes[0].remove();
  }

  pseudodom.forEach( elem => {
    if (!(elem.shouldRender === false)) {
      parent.appendChild(elem.node);
      if (elem.children) {
        renderDom(elem.node, elem.children);
      }
    }
  });
}

function renderTodoApp() {
  renderDom(document.getElementById('root'), [
    { node: heading('Todo App') },
    { node: newTodoForm(), shouldRender: !state.showEditForm, children: [
      { node: textInput(saveNewTodo, state.newTodo, !state.showEditForm) },
      { node: button('submit', 'Add') }
    ]},
    { node: editForm(), shouldRender: state.showEditForm, children: [
      { node: textInput(saveEditText, state.editText, state.showEditForm) },
      { node: button('submit', 'Save') },
      { node: button('button', 'Close Editor', closeEditor)}
    ]},
    { node: todoList(), children: populatedTodoRows() }
  ]);

  if (state.focusedNode) {
    state.focusedNode.focus();
  }

}




renderTodoApp();
getTodos();
