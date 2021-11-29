export const dbTasks = (cookieValue) => {
  return fetch("https://mongodb-ex-react-node-todo-app.herokuapp.com/failure-auth", {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};

export const homeGet = () => {
  let cookieValue;

  if (document.cookie) {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => {
        return row.startsWith("Jwt=");
      })
      .split("=")[1];
  }

  return fetch("http://127.0.0.1:3001", {
    method: "GET",
    headers: new Headers({
      Authorization: cookieValue,
      "Content-Type": "application/json",
    }),
  });
};
