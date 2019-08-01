
const state = {
  showEditForm: false,
  todos: []
}

/* Components */

const Elem = (tag) => document.createElement(tag);

const Heading = (text) => {
  const heading = Elem('h1');
  heading.innerText = text;
  return heading;
};

const Form = (submitHandler) => {
  const form = Elem('form');
  form.addEventListener('submit', submitHandler);
  return form;
} 

const NewTodoForm = () => Form(postNewTodo);

const EditForm = () => Form(submitEditValue);

const TextInput = (changeHandler, value='', isFocused=false) => {
  const input = Elem('input');
  input.type = 'text';
  input.value = value;
  input.addEventListener('change', changeHandler);
  if (isFocused) {
    state.focusedNode = input;
  }
  return input;
}

const Button = (type, text, clickHandler) => {
  const button = Elem('button');
  button.type = type;
  button.innerText = text;
  if (clickHandler) {
    button.addEventListener('click', clickHandler);
  }
  return button;
}

const TodoList = () => {
  const todoList = Elem('div');
  todoList.className = 'todo-list';
  return todoList;
}

const TodoRow = () => {
  const todoRow = Elem('div');
  todoRow.className = 'todo-row';
  return todoRow;
}

const TodoText = (text) => {
  const todoText = Elem('p');
  todoText.innerText = text;
  return todoText;
}

const PopulatedTodoRows = () => {
  return state.todos.map( todo => (
    { node: TodoRow(), children: [
      { node: TodoText(todo.text) },
      { node: Button('button', 'Edit', ((id, text) => () => showEditor(id, text))(todo._id, todo.text)) },
      { node: Button('button', 'Delete', (id => () => deleteTodo(id))(todo._id)) }
    ]}));
}



/* Fetch functions */

function getTodos() {
  fetch('/api/todos')
    .then( res => res.ok && res.json() )
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
    .then( res => res.ok && res.json() )
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
    .then( res => res.ok && res.json() )
    .then( todos => {
      state.todos = todos;
      closeEditor();
    })
    .catch( err => console.log(err) );
}

function deleteTodo(id) {
  fetch(`/api/todos/${id}`, { method: 'delete' })
    .then( res => res.ok && res.json() )
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

function renderDom( parent, tree ) {
  while (parent.childNodes.length > 0) {
    parent.childNodes[0].remove();
  }

  tree.forEach( branch => {

    if (branch.shouldRender === false) {
      return;
    }

    parent.appendChild(branch.node);
    if (branch.children) {
      renderDom(branch.node, branch.children);
    }
  });
}

function renderTodoApp() {
  const root = document.getElementById('root');

  const todoAppStructure = [
    { node: Heading('Todo App') },
    { node: NewTodoForm(), shouldRender: !state.showEditForm, children: [
      { node: TextInput(saveNewTodo, state.newTodo, !state.showEditForm) },
      { node: Button('submit', 'Add') }
    ]},
    { node: EditForm(), shouldRender: state.showEditForm, children: [
      { node: TextInput(saveEditText, state.editText, state.showEditForm) },
      { node: Button('submit', 'Save') },
      { node: Button('button', 'Close Editor', closeEditor)}
    ]},
    { node: TodoList(), children: PopulatedTodoRows() }
  ];

  renderDom(root, todoAppStructure);

  if (state.focusedNode) {
    state.focusedNode.focus();
    state.focusedNode = null;
  }

}


renderTodoApp();
getTodos();
