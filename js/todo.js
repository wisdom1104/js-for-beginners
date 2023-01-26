const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}


function checkBox (event) {
  const button = event.target;
  button.innerText = "✔";
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();

}

function delCheck (event) {
  const button = event.target;
  button.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const checkbutton = document.createElement("button");
  const checkObj = {
    id: Date.now(),
  };

  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const delbutton = document.createElement("button");
  delbutton.innerText = "✖";
  checkbutton.addEventListener("click", checkBox);
  delbutton.addEventListener("click", deleteToDo);
  li.appendChild(checkbutton);
  li.appendChild(span);
  li.appendChild(delbutton);
  toDoList.appendChild(li);
  // if(checkbutton.innertext !== "none") {
  //   checkbutton.innertext = "none";
  // }
  checkbutton.push(checkObj);

}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}