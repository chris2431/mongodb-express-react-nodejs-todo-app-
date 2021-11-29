const updateTodo = (clientData) => {
  fetch("http://127.0.0.1:3001/todos", {
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
