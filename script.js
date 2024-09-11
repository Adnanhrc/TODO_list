  // script.js

  document.addEventListener("DOMContentLoaded", function () {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");

    // Load todos from localStorage
    loadTodos();

    // Add a new todo
    todoForm.addEventListener("submit", (e)=> {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText !== "") {
            addTodo(todoText);
            todoInput.value = "";
            saveTodos();
        }
    });

    // Delete a todo
    todoList.addEventListener("click",(e)=> {
        if (e.target.tagName === "BUTTON") {
            e.target.parentElement.remove();
            saveTodos();
        }
    });
   

    // Function to add a new todo to the list
    function addTodo(todoText) {
        const li = document.createElement("li");
        li.textContent = todoText;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    }

    // Function to save todos to localStorage
    // The saveTodos() function is responsible for saving the current list of todos to the browser's localStorage. Here's a detailed breakdown of how it works:
    // li.textContent retrieves the text content of the list item. However, this text includes the word "Delete" because each todo item has a "Delete" button.
    // .replace("Delete", "") removes the word "Delete" from the text content.  (   see reason  of below method       )




    function saveTodos() {
        const todos = [];
        document.querySelectorAll("#todo-list li").forEach((li)=> {
            todos.push(li.textContent.replace("Delete", "").trim());
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    }


    // The todos array, which now contains all the current todo items as plain text strings, needs to be stored as a single string in localStorage.Since localStorage only stores strings, the JSON.stringify(todos) method is used to convert the todos array into a JSON string.

    //     Finally, localStorage.setItem("todos", JSON.stringify(todos)); saves the stringified version of the todos array under the key "todos" in localStorage.



    // Function to load todos from localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.forEach(function (todo) {
            addTodo(todo);
        });
    }
});