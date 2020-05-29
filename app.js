const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodoItem(textValue) {
    //todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = textValue;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //create mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    return todoDiv;
}
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    //add todo to localstorage
    //todoItem Div
    if (validate(todoInput.value) == true) {
        saveLocalTodos(todoInput.value);
        const todoDiv = addTodoItem(todoInput.value);
        //append to list
        todoList.appendChild(todoDiv);
    } else {
        alert("You can't add empty text");
    }
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    console.log(item);

    //delete todo
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;

        //annimation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        removeLocalTodosAsCompleted(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        })
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        console.log('todo check', todo);
        todo.classList.toggle("completed");
        if (todo.classList.contains("completed")) {
            saveLocalTodosAsCompleted(todo.children[0].innerText);
            console.log('for check',todo.children[0].innerText);
        } else {
            removeLocalTodosAsCompleted(todo);
        }
    }
}
function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    })
}

//////////////////////////////////
function validate(value) {
    value = value.replace(/\s+/g, '');
    console.log('validate value', value,'xx');
    if (value == null || value == "") {
        return false;
    }
    return true;
}
