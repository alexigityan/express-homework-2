const deleteButtons = document.querySelectorAll('.delete-button');

deleteButtons.forEach(activateDeleteButton);

function activateDeleteButton(button) {
  const target = button.getAttribute('data-target');
  button.addEventListener('click', () => {
    fetch(`api/todos/${target}`, { method: 'delete' })
      .then(res => res.json())
      .then(todos => displayTodos(todos))
      .catch(err => console.log(err));
  })
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
    editButton.innerText = 'Edit';
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