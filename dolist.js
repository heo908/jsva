
const toDoForm = document.querySelector(".js-form-greeting"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList"),
      jsList = document.querySelector(".js-list");


let userName = [];
const TODOS_LS = "toDos";


function saveUserName() {
    localStorage.setItem(TODOS_LS,  JSON.stringify(userName));
}


function paintToDoList(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "X";
    const newId =  userName.length + 1; 
    const span = document.createElement("span");
    span.innerText = text;
    delBtn.addEventListener("click", removeList);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text:text,
        id: newId
    }
    userName.push(toDoObj);
    saveUserName();
}

function removeList(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = userName.filter(function (toDo) {
        return toDo.id !==  parseInt(li.id)     
    });
    userName = cleanToDos;
    saveUserName();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDoList(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const listName = localStorage.getItem(TODOS_LS);
    if (listName !== null) {
       const parsedToDos =  JSON.parse(listName);
       parsedToDos.forEach(function (toDo) {
        paintToDoList(toDo.text)
       });
        
    }
}

function init() {
     loadToDos();
     toDoForm.addEventListener("submit", handleSubmit);
     getTime();
     setInterval(getTime, 1000);
    }


init();
