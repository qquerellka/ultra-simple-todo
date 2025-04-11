const todolist = JSON.parse(localStorage.getItem('todolist')) || [];;

renderTodoList();

function deleteTodo(index) {
  todolist.splice(index, 1);
  updateLocalStorage();
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = '';

  todolist.forEach((todoObject, index) => {
    const { name, dueDate } = todoObject
    const html =
      `
      <div>${name}</div>
      <div>${dueDate}</div>
      <button class="delete-todo-button js-delete-todo-button" onclick="">Delete</button>
    `;
    todoListHTML += html;
  })

  console.log(todoListHTML);

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
  document.querySelectorAll(".js-delete-todo-button").forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todolist.splice(index, 1); 
      renderTodoList();
    })
  })
}

document.querySelector(".add-todo-button").addEventListener('click', () => {
  addTodo();
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  if (!name || !dueDate) return;

  todolist.push({ name, dueDate });

  inputElement.value = '';
  dateInputElement.value = '';
  updateLocalStorage();

  renderTodoList();
}

function updateLocalStorage() {
  localStorage.setItem('todolist', JSON.stringify(todolist));
}