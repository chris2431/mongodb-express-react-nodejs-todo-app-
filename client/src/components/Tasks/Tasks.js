import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { dbTasks } from "../methods/get";
import deleteTodo from "../methods/delete";
import updateTodo from "../methods/put";
import postTodo from "../methods/post";
import trashIcon from "./assets/trash.png";
import checkIcon from "./assets/check.png";

// Stlyes
import { Header } from "../styles/Todos/Todos.styles";
import { Main } from "../styles/Todos/Todos.styles";
import { Section } from "../styles/Todos/Todos.styles";
import { Table } from "../styles/Todos/Todos.styles";
import { Thead } from "../styles/Todos/Todos.styles";
import { Tbody } from "../styles/Todos/Todos.styles";
import { Trow } from "../styles/Todos/Todos.styles";

import { useQuery, useMutation } from "react-query";

const Task = () => {
  const navigate = useNavigate();

  const [todoAlreadyExists, setTodoAlreadyExists] = useState(null);
  const [inputIsEmpty, setInputIsEmpty] = useState(null);
  const [regExDoesNotMatch, setRegExDoesNotMatch] = useState(null);
  const inputRef = useRef(null);

  // Logic to get the cookie (jwt) and send it to the the server
  let cookieValue;

  if (document.cookie) {
    cookieValue = document.cookie
      .split("; ")
      .find((row) => {
        return row.startsWith("Jwt=");
      })
      .split("=")[1];
  }

  // Getting TODOS
  const { refetch, data } = useQuery("todos", () => dbTasks(cookieValue).then((res) => res.json()), {
    onSuccess: (data) => {
      if (data.success === false) {
        navigate("/");
      }
    },
  });

  // Posting TODOS
  const { mutate } = useMutation(postTodo, {
    onSuccess: (todoname) => {
      data.todos.push({ todoname: todoname, todostatus: "In Progress" });
    },
  });

  // RegEx
  const regEx2 = /^([a-zA-Z0-9-!$%^&*()_+|~=`{}:";'<>?,./]{0,10}[\s]*){1,7}$/;

  const handleAddTaskButton = (e) => {
    e.preventDefault();

    const clientData = { todoname: inputRef.current.value, cookieValue: cookieValue };

    const inputValue = inputRef.current.value;

    if (regEx2.test(inputValue) === false) {
      setRegExDoesNotMatch(true);
      setTodoAlreadyExists(false);
      setInputIsEmpty(false);

      // Prevent the todo to be added twice
    } else if (data.todos.some((todo) => todo.todoname === inputValue) === true) {
      setTodoAlreadyExists(true);
      setRegExDoesNotMatch(false);
      setInputIsEmpty(false);
    } else if (inputValue === "") {
      setInputIsEmpty(true);
    } else {
      //Mutate
      mutate(clientData);
      inputRef.current.value = "";
      setRegExDoesNotMatch(false);
      setInputIsEmpty(false);
      setTodoAlreadyExists(false);
    }
  };

  // Loging out the user by deleting the cookie (jwt) and then refetching which will cause a server response of success false redirecting the user to /home
  const handleLogOut = () => {
    cookieValue = null;
    document.cookie = "Jwt=";

    refetch();
  };

  return (
    <>
      <Header className="header">
        <h1 className="title">Todo App</h1>

        <button onClick={handleLogOut}>Log out</button>
      </Header>
      <Main className="mainContainer">
        {!data ? null : <h3 className="username">{data.username + "'s Todos"}</h3>}
        <form className="formContainer">
          <input className="input" ref={inputRef} type="text" />
          <button className="addTodoBtn" onClick={handleAddTaskButton}>
            Add Todo
          </button>
        </form>
        {regExDoesNotMatch ? <p>Describe your todo with shorter keywords</p> : null}
        {inputIsEmpty ? <p>No todo has been written</p> : null}
        {todoAlreadyExists ? <p>Todo already added</p> : null}

        <Section className="section">{!data ? <p>Loading...</p> : <TaskTable cookieValue={cookieValue} refetch={refetch} todos={data.todos}></TaskTable>} </Section>
      </Main>
    </>
  );
};

const TaskTable = (props) => {
  const tBodyRef = useRef(null);

  // Deleting TODO
  const { mutate } = useMutation(deleteTodo);

  // Updating TODO
  const mutation = useMutation(updateTodo);

  const todos = props.todos;

  // Using the btn number (created with the attr data-) to delete or update a todo
  let todoNumber = 0;

  const todoIndex = (target) => {
    // index of the btn
    let index = target.dataset.index - 1;

    // selecting a todo be deleted or updated
    const clientData = { todoname: todos[index].todoname, cookieValue: props.cookieValue };

    // Get executed if delete button is clicked
    if (target.className === "deleteBtn") {
      mutate(clientData, {
        onSuccess: () => {
          // deleting todo locally
          todos.splice(index, 1);
        },
      });
    }

    // Get executed if finished button is clicked
    if (target.className === "finishedBtn") {
      mutation.mutate(clientData);

      // updating todo locally
      todos[index].todostatus = "Completed";
    }
  };

  return (
    <>
      {!todos ? (
        <p>Loading...</p>
      ) : (
        <Table>
          <Thead className="thead">
            <tr>
              <th>No.</th>
              <th>Todo Name</th>
              <th className="thStatus">Status</th>
              <th className="thActions">Actions</th>
            </tr>
          </Thead>
          <Tbody ref={tBodyRef} className="tbody">
            {todos.map((todo) => {
              return (
                <Trow data-index={todoNumber} key={todoNumber}>
                  <td className="tdNumber">{++todoNumber}</td>
                  <td className={"tdName"}>{todo.todoname}</td>
                  <td className={`tdStatus ${todo.todostatus}`}>{todo.todostatus}</td>
                  <td className="tdActions">{<Buttons todoIndex={todoIndex} todoNumber={todoNumber} />}</td>
                </Trow>
              );
            })}
          </Tbody>
        </Table>
      )}
    </>
  );
};

const Buttons = (props) => {
  const bttnRef = useRef(null);

  const handleDeleteBtnClick = (e) => {
    props.todoIndex(e.target);
  };
  return (
    <>
      <img ref={bttnRef} className="deleteBtn" onClick={handleDeleteBtnClick} data-index={props.todoNumber} alt="trash-icon" src={trashIcon} />

      <img className="finishedBtn" onClick={handleDeleteBtnClick} data-index={props.todoNumber} alt="check-icon" src={checkIcon} />
    </>
  );
};

export default Task;
