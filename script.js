const deleteButton = document.getElementsByClassName("x");
const checkBoxes = document.getElementsByClassName("checkbox");
const addTodo = document.getElementById("add-todo");
const addTodoBtn = document.getElementById("add-todo-btn");
const todoList = document.getElementById("todo-list");

function crossTextIfCheck(checkbox, e) {
  if (checkbox.checked) {
    e.target.nextElementSibling.style.textDecoration = "line-through";
  } else {
    e.target.nextElementSibling.style.textDecoration = "none";
  }
}
function addTodoToList(title) {
  const newTodo = document.createElement("div");
  newTodo.classList.add("todo");
  //   adding checkbox into todo
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.classList.add("checkbox");
  //   functionality for checkbox
  input.addEventListener("change", (e) => {
    crossTextIfCheck(input, e);
  });
  //  adding delete btn into todo
  const h3 = document.createElement("h3");
  h3.innerText = title;

  const span = document.createElement("span");
  span.innerText = "X";
  span.id = "x";
  //   functionality for delete
  span.addEventListener("click", (e) => {
    e.target.parentElement.remove();
  });

  newTodo.appendChild(input);
  newTodo.appendChild(h3);
  newTodo.appendChild(span);
  todoList.appendChild(newTodo);
  addTodo.value = "";
}

for (let d of deleteButton) {
  d.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    e.target.parentElement.remove();
  });
}

for (let d of checkBoxes) {
  d.addEventListener("change", (e) => {
    console.log(e.target.nextElementSibling);
    crossTextIfCheck(d, e);
  });
}
// creating new todo
addTodoBtn.addEventListener("click", () => {
  addTodoToList(addTodo.value);
});
async function getData() {
  // await asynchronni funkce asyn je asynchronni funkce kde se da pouzit await, ktera spousti funkce a drive se pouzivalo js probis.
  const rest = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  // prevede nam data do jazyku  json, slouzi k ukladani objektu jedina jeho funkce

  const data = await rest.json();
  for (let i of data) {
    addTodoToList(i.title); // jde z API
  }
}
getData();
