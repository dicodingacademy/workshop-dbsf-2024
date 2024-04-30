/** TODO SCHEMA
[
  {
    id: Number,
    title: String,
    isCompleted: Boolean,
  }
]
*/

(function () {
  // Get elements
  const todoList = document.querySelector('#todoList');
  const createTodoForm = document.querySelector('#createTodoForm');
  const todoTitleInput = createTodoForm.elements.todoTitle;

  createTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get todo title value
    const todoTitle = todoTitleInput.value;

    // Store new todo
    storeTodo(todoTitle);

    // Clear input data from user
    clearForm();

    // Rerender/Update UI
    render();
  });

  function getAllTodos() {
    const todosString = localStorage.getItem('todos');
    const todos = JSON.parse(todosString);

    // Return empty array if nothing saved
    if (Array.isArray(todos)) {
      return todos;
    } else {
      return [];
    }
  }

  function storeTodo(title) {
    // Get all current todos
    const todos = getAllTodos();

    // Get todo object
    const newTodo = generateTodoObject(title);

    // Storing new todo to current todos
    const newTodos = [...todos, newTodo];
    const newTodosString = JSON.stringify(newTodos);
    localStorage.setItem('todos', newTodosString);
  }

  function markAsTodoCompleted(id) {
    // Get all current todos
    const todos = getAllTodos();

    // Update selected todo to completed
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.isCompleted = true;
      }

      return todo;
    });

    // Updating current todos
    const newTodosString = JSON.stringify(newTodos);
    localStorage.setItem('todos', newTodosString);
  }

  function markAsTodoUncompleted(id) {
    // Get all current todos
    const todos = getAllTodos();

    // Updating selected todo to completed
    const newTodos = todos.map((todo) => {
      if (todo.id == id) {
        todo.isCompleted = false;
      }

      return todo;
    });

    // Updating current todos
    const newTodosString = JSON.stringify(newTodos);
    localStorage.setItem('todos', newTodosString);
  }

  function destroyTodo(id) {
    // Get all current todos
    const todos = getAllTodos();

    // Get todo by id
    const todo = todos.find((todo) => todo.id == id);
    const index = todos.indexOf(todo);

    // Check founded todo is available
    if (index === -1) return todos;

    // Deleting selected todo from todos
    const newTodos = todos.filter((todo) => {
      return todo.id != id;
    });
    const newTodosString = JSON.stringify(newTodos);
    localStorage.setItem('todos', newTodosString);
  }

  const todoItemTemplate = (todo) => {
    return `
      <li class="todo-item ${todo.isCompleted ? 'completed' : ''}" data-id="${todo.id}">
        <input
          class="toggle" 
          type="checkbox" 
          data-id="${todo.id}" 
          ${todo.isCompleted ? 'checked' : ''}
        />
        <div class="todo-item__title">
          ${todo.title}
        </div>
        <button class="destroy" data-id="${todo.id}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </li>
    `;
  };

  function generateTodoObject(title) {
    const id = +new Date();
    const isCompleted = false;

    return { id, title, isCompleted };
  }

  function clearForm() {
    todoTitleInput.value = '';
  }

  function render() {
    const todos = getAllTodos();

    todoList.innerHTML = '';
    for (const todo of todos.toReversed()) {
      const newTodoElement = todoItemTemplate(todo);
      todoList.innerHTML += newTodoElement;
    }

    afterRender();
  }

  function afterRender() {
    const toggleCheckboxes = todoList.querySelectorAll('.toggle');
    toggleCheckboxes.forEach((toggleCheckbox) => {
      toggleCheckbox.addEventListener('change', (event) => {
        const todoId = event.currentTarget.dataset.id;

        if (event.target.checked) {
          markAsTodoCompleted(todoId);
        } else {
          markAsTodoUncompleted(todoId);
        }

        // Rerender/Update UI
        render();
      });
    });

    const destroyButtons = todoList.querySelectorAll('.destroy');
    destroyButtons.forEach((destroyButton) => {
      destroyButton.addEventListener('click', (event) => {
        const todoId = event.currentTarget.dataset.id;

        destroyTodo(todoId);

        // Rerender/Update UI
        render();
      });
    });
  }

  render();
})();
