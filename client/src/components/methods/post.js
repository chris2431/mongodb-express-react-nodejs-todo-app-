const postTodo = (clientData) => {
  fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/todos", {
    method: "POST",
    headers: new Headers({
      Authorization: clientData.cookieValue,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({
      todoname: clientData.todoname,
    }),
  });

  return clientData.todoname;
};

export const loginPost = (userCredentials) => {
  return fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/login", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      username: userCredentials.loginUsername,
      password: userCredentials.loginPassword,
    }),
  });
};

export const registerPost = (userCredentials) => {
  return fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: userCredentials.registerUsername,
      password: userCredentials.registerPassword,
    }),
  });
};

export default postTodo;
