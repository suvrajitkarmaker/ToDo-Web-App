document.addEventListener('DOMContentLoaded', getTodos);

function getValuesByKey(key) {
    let newClass = new localstorageclass(key);
    return newClass.getValue();
}
function saveLocalTodos(todo) {

    let newClass = new localstorageclass("todos");
    newClass.updateValue(todo);
}
function saveLocalTodosAsCompleted(todo) {

    let newClass = new localstorageclass("todosAsCompleted");
    newClass.updateValue(todo);
}
function getTodos() {

    copyTodosAsCompleted();
    let todos = getValuesByKey("todos");
    todos.forEach(function (todo) {
        //retrive Todo Item
        const todoDiv = addTodoItem(todo);
        //append to list
        if (checkTodosAsCompleted(todo) === true) {
            todoDiv.classList.toggle("completed");
        }
        console.log(todoDiv);
        todoList.appendChild(todoDiv);
    })
}
function removeLocalTodos(todo) {

    let forCheck = new localstorageclass("todos");
    forCheck.deleteValue(todo.children[0].innerText);
}
function removeLocalTodosAsCompleted(todo) {

    let forCheck = new localstorageclass("todosAsCompleted");
    forCheck.deleteValue(todo.children[0].innerText);
}
function checkTodosAsCompleted(todo) {

    let forCheck = new localstorageclass("copyTodosAsCompleted");
    return forCheck.deleteValue(todo);
}
function copyTodosAsCompleted() {

    let todos = getValuesByKey("todosAsCompleted");
    localStorage.setItem("copyTodosAsCompleted", JSON.stringify(todos));
}