//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click',filterTodo);
//Functions

function addTodo(event){
    //Prevent form from submitting
    event.preventDefault();
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK TODO TO LOCALSTORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //CHECK TEST
    const testButton = document.createElement('button');
    testButton.innerHTML = '<i class="fas fa-pencil-ruler"></i>';
    testButton.classList.add("test-btn");
    todoDiv.appendChild(testButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    //Clear Todo Value
    todoInput.value= "";
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] == 'trash-btn'){
        const todo = item.parentElement;
        //Animation 
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitioned',function(){
            todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] == 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    //Check test
    if(item.classList[0] == 'test-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('testing');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case"completed":
                if(todo.classList.contains('completed')) {
                    todo.style.display ='flex';
                } else {
                    todo.style.display ="none";
                }
                break
            case "uncompleted":
                if(!todo.classList.contains('completed')) {
                    todo.style.display ='flex';
                } else {
                    todo.style.display ="none";
                }
                break;
            
            case "testing":
                if(todo.classList.contains('testing')) {
                    todo.style.display ='flex';
                }else {
                    todo.style.display ="none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
     //CHECK DO I already have thing there?
     let todos;
     if(localStorage.getItem('todos')=== null){
         todos= [];
     } else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     todos.push(todo);
     localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    
    let todos;
    //CHECK DO I already have thing there?
    if(localStorage.getItem('todos')=== null){
        todos= [];
    } else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //CHECK TEST
    const testButton = document.createElement('button');
    testButton.innerHTML = '<i class="fas fa-user-edit"></i>';
    testButton.classList.add("test-btn");
    todoDiv.appendChild(testButton);
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
     //CHECK DO I already have thing there?
     let todos;
     if(localStorage.getItem('todos')=== null){
         todos= [];
     } else{
         todos = JSON.parse(localStorage.getItem("todos"));
     }
     const todoIndex = todo.children[0].innerText
     todos.splice(todos.indexOf(todoIndex),1);
     localStorage.setItem('todos',JSON.stringify(todos));
}