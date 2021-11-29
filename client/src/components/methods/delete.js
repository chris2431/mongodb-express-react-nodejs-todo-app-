const deleteTodo = (clientData) => {
  fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/failure-auth", {
    method: "DELETE",
    headers: new Headers({
      Authorization: clientData.cookieValue,
      "Content-type": "application/json",
    }),
    body: JSON.stringify({
      todoname: clientData.todoname,
    }),
  });
};

export default deleteTodo;
