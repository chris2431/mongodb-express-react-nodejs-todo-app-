import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router";
import { loginPost, registerPost } from "../methods/post";
import { homeGet } from "../methods/get";
import { Main, DivFormsContainer, DivForms } from "../styles/HomePage/Form.styled";

const HomePage = () => {
  const navigate = useNavigate();

  // States for login
  const [loginUsername, setLoginUsername] = useState();
  const [loginPassword, setLoginPassword] = useState();

  // States for register
  const [registerUsername, setRegisterUsername] = useState(null);
  const [registerPassword, setRegisterPassword] = useState(null);

  // Server call to  know if a user is logged in or needs to register
  useQuery("", () => homeGet().then((res) => res.json()), {
    onSuccess: (data) => {
      // If the user tries to go to / and is already logged in is going to be redirected to /todos otherwise is going to stay in /
      if (data.success === true) {
        navigate("/todos");
      }
    },
  });

  const date = new Date();

  date.setTime(date.getTime() + 1000 * 60 * 60 * 24);

  // Login post
  const mutation = useMutation((userCredentials) => loginPost(userCredentials).then((res) => res.json()), {
    onSuccess: (res) => {
      console.log(res);
      // Saving the JWT as a cookie
      document.cookie = `Jwt=${res.token}; expires=${date}`;

      // If the server response for user log in is true then the user is redirected to /todos
      if (res.success === true) {
        return navigate("/todos");
      }
    },
  });

  // Register post
  const { data, mutate, reset } = useMutation((userCredentials) => registerPost(userCredentials).then((res) => res.json()), {
    onSuccess: (res) => {
      // Saving the JWT as a cookie
      document.cookie = `Jwt=${res.token}; expires=${date}`;
      if (res.success === true) {
        return navigate("/todos");
      }
    },
  });

  //Capturing login form
  const onFormLoginChange = (e) => {
    mutation.reset();
    if (e.target.attributes.name.value === "username") {
      setLoginUsername(e.target.value);
    }
    if (e.target.attributes.name.value === "password") {
      setLoginPassword(e.target.value);
    }
  };

  // Sending login user credentials
  const onLoginPostClick = (e) => {
    e.preventDefault();

    const userCredentials = {
      loginUsername,
      loginPassword,
    };
    reset();
    mutation.mutate(userCredentials);
  };

  //Capturing register form
  const onFormRegisterChange = (e) => {
    reset();
    if (e.target.attributes.name.value === "username") {
      setRegisterUsername(e.target.value);
    }
    if (e.target.attributes.name.value === "password") {
      setRegisterPassword(e.target.value);
    }
  };

  // Sending register user credentials
  const onRegisterPostClick = (e) => {
    e.preventDefault();
    const userCredentials = {
      registerUsername,
      registerPassword,
    };

    mutation.reset();
    mutate(userCredentials);
  };

  return (
    <Main>
      <DivFormsContainer>
        <DivForms>
          <h1>Log in</h1>
          <form onInput={onFormLoginChange}>
            <label>Username</label>
            <div className="inputUsernameContainer">
              <input placeholder="Type your username" type="text" name="username" className="usernameInp" />
            </div>
            {!mutation.data ? null : mutation.data.isUsernameEmpty ? <p className="err">{mutation.data.isUsernameEmpty}</p> : null}
            {!mutation.data ? null : mutation.data.userNotFound ? <p className="err">{mutation.data.userNotFound}</p> : null}

            <label>Password</label>
            <div className="inputPasswordContainer">
              <input placeholder="Type your password" type="password" className="passwordInp" name="password" />
            </div>
            {!mutation.data ? null : mutation.data.isPasswordEmpty ? <p className="err">{mutation.data.isPasswordEmpty}</p> : null}

            {!mutation.data ? null : mutation.data.isPasswordWrong ? <p className="err">{mutation.data.isPasswordWrong}</p> : null}
            <button onClick={onLoginPostClick}>Log in</button>
          </form>

          <h1>Sing in</h1>
          <form onInput={onFormRegisterChange}>
            <label>User Name</label>
            <div className="inputUsernameContainer">
              <input placeholder="Type your username" type="text" name="username" className="usernameInp" />
            </div>
            {!data ? null : data.isUsernameEmpty ? <p className="err">{data.isUsernameEmpty}</p> : null}
            {!data ? null : data.userExists ? <p className="err">{data.userExists}</p> : null}

            <label>Password</label>
            <div className="inputPasswordContainer">
              <input placeholder="Type your password" type="password" name="password" className="passwordInp" />
            </div>
            {!data ? null : data.isPasswordEmpty ? <p className="err">{data.isPasswordEmpty}</p> : null}
            <button onClick={onRegisterPostClick}>Log in</button>
          </form>
        </DivForms>
      </DivFormsContainer>
    </Main>
  );
};

export default HomePage;
