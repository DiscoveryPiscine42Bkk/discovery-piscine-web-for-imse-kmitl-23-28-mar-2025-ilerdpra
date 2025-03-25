const ft_list = document.getElementById("ft_list");
const loadTodos = () => {
  let todos = getCookies("todos");
  if (todos) {
    todos = JSON.parse(todos);
    todos.forEach(todo => addTodo(todo));
  }
};

const saveTodos = () => {
  let todos = [];
  ft_list.childNodes.forEach(todo => todos.push(todo.innerText));
  document.cookie = `todos=${JSON.stringify(todos)}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
};

const getCookies = (name) => {
  let cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    let [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
};

const createTodo = () => {
  let txt = prompt("Please enter a new TODO:");
  if (txt && txt.trim() !== "") {
    addTodo(txt);
    saveTodos();
  }
};

const addTodo = (txt) => {
  let node = document.createElement("div");
  node.innerText = txt;
  node.onclick = () => {
    const check = confirm("Do you want to delete this TODO?");
    if (check) {
      node.remove();
      saveTodos();
    }
  };
  ft_list.prepend(node);
};

loadTodos();