// Tüm elementleri seçme.
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){               // Tüm eventListenerlar
      form.addEventListener("submit",addTodo);
      document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
      secondCardBody.addEventListener("click",deleteTodo);
      filter.addEventListener("keyup",filterTodos);
      clearButton.addEventListener("click",clearAllTodos);
}
function clearAllTodos(e){              // Tüm Todoları Silme.
    if (confirm("Tüm todolaro silmek istediğinize emin misiniz ?")){
        // Todoları Arayüzden Temizleme
        while(todoList.firstElementChild != null){   // Hızlı yöntem kısa yol.
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");

    }
    
}
function filterTodos(e){          // Filtreleme Özelliği
     const filterValue = e.target.value.toLowerCase();
     const listItems = document.querySelectorAll(".list-group-item");

     listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1){
            // Bulunamadı 

            listItem.setAttribute("style","display : none !important");
        }
        else {
            listItem.setAttribute("style","display : block");
        }
     })
}
function deleteTodo(e){
    if (e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyle silindi.")
    }
}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo,index){
        if(todo === deletetodo){
            todos.splice(index,1); // Arrayden değeri silme.
        }

        localStorage.setItem("todos",JSON.stringify(todos));
    });

}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}
function addTodo(e){
    const newTodo = todoInput.value.trim();   // trim kullanarak boşluklu yazılar normale çevirilir.
    
    if (newTodo === "") {
        showAlert("danger","Lütfen bir todo giriniz.");    // Bilgilendirme mesajları.
    }
    else {
        addTodoToUI(newTodo);
        addTodoStorage(newTodo);
        showAlert("success","Todo başarılı bir şekilde eklendi.")
    }
    e.preventDefault();
}
function getTodosFromStorage(){  // Storage da bütün todoları alma.
    let todos;

    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function addTodoStorage(newTodo){
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));   // Local Storage daki değeri güncelleme. // JSON.stringify ile arrayleri string hale getiriyoruz.
}
function showAlert(type,message){
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    // setTimeout
    setTimeout(function(){       // Alert'in ekrana geldikten hemen sonra kaç saniye içerisinde ortadan kaybolacağını belirler.
        alert.remove();
    },1500);
    
}

function addTodoToUI(newTodo){       // String değerini list item olarak UI'ya ekleyecek.
          
    // List Item oluşturma.
    const listItem = document.createElement("li");
    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    // Class Ekleme
    listItem.className = "list-group-item d-flex justify-content-between";
    // Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // Todo List'e List Item'ı ekleme
    todoList.appendChild(listItem);
    todoInput.value = ""; // Todo ekledikten sonra içini tamamen boşaltır.

}