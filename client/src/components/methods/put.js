const updateTodo = (clientData) => {
  fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/todos", {
    method: "PUT",
    headers: new Headers({
      Authorization: clientData.cookieValue,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      todoname: clientData.todoname,
    }),
  });
};

export default updateTodo;
