const deleteButtons = document.querySelectorAll('.delete-button');
const editButtons = document.querySelectorAll('.edit-button');


deleteButtons.forEach(activateDeleteButton);
editButtons.forEach(activateEditButton);

document.querySelector('#close-editor').addEventListener('click', hideEditor);
document.querySelector('#todo').focus();


function activateDeleteButton(button) {
  const target = button.getAttribute('data-target');
  button.addEventListener('click', () => {
    fetch(`api/todos/${target}`, { method: 'delete' })
      .then(res => res.json())
      .then(todos => displayTodos(todos))
      .catch(err => console.log(err));
  });
}

function activateEditButton(button) {
  const currentText = button.getAttribute('data-text');
  const target = button.getAttribute('data-target');
  button.addEventListener('click', ()=>{
    prepareEditor(target, currentText);
  });
}

function showEditor() {
  const editor = document.querySelector('#editor');
  editor.style.display = '';
}

function hideEditor() {
  const editor = document.querySelector('#editor');
  editor.style.display = 'none';
}

function prepareEditor(target, currentText) {
  showEditor();
  const editText = document.querySelector('#edit-text');
  editText.value = currentText;
  const submit = document.querySelector('#submit-edit');
  submit.setAttribute('data-target', target);
  submit.addEventListener('click', submitEdit);
}

function submitEdit(event) {
  const target = event.target.getAttribute('data-target');
  const editText = document.querySelector('#edit-text');
  const newTodo = editText.value;
  if(newTodo !== '') {
    fetch(`api/todos/${target}`, { 
      method: 'put', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ newTodo })
    })
      .then(res => res.json())
      .then(todos => (hideEditor(), displayTodos(todos)))
      .catch(err => console.log(err)); 
  } else {
    editText.focus();
  }   
}

function displayTodos(todos) {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = "";

  todos.forEach( todo => {
    const todoRow = document.createElement('div');
    todoRow.className = 'todo-row';
    const todoText = document.createElement('p');
    todoText.className = 'todo-text';
    todoText.innerText = todo.text;
    todoRow.appendChild(todoText);
    const editButton = document.createElement('button');
    editButton.className = 'edit-button';
    editButton.setAttribute('data-target', todo.id);
    editButton.setAttribute('data-text', todo.text);
    editButton.innerText = 'Edit';
    activateEditButton(editButton);
    todoRow.appendChild(editButton);
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.setAttribute('data-target', todo.id);
    deleteButton.innerText = 'Delete';
    activateDeleteButton(deleteButton);
    todoRow.appendChild(deleteButton);
    todoList.appendChild(todoRow);
  });
}