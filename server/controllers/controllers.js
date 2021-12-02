import Todos from "../models/tasks-model.js";
import User from "../models/user-model.js";
import { genPassword, validatePassword } from "../lib/passwordUtils.js";
import { issueJWT } from "../lib/jwtUtils.js";

const controller = {};

controller.home = (req, res) => {
  res.json({ success: true });
};

controller.failureRoute = (req, res) => {
  res.json({ success: false });
};

controller.get = async (req, res) => {
  try {
    const username = req.user.username;
    // Todos with all info from database
    const todos = await Todos.find({ username: username });

    let arrOfTodos = [];

    // Mapping through todos coming from database
    todos.forEach((todo) => {
      arrOfTodos.push({ todostatus: todo.todostatus, todoname: todo.todoname });
    });

    res.send({ success: true, todos: arrOfTodos, username: username });
  } catch (err) {
    res.redirect("/");
  }
};

// Update TODO
controller.put = async (req, res) => {
  try {
    const username = req.user.username;
    await Todos.updateOne({ username: username, todoname: req.body.todoname, todostatus: "In Progress" }, { todostatus: "Completed" });
    res.end();
  } catch (err) {
    res.redirect("/");
  }
};

// Delete TODO
controller.delete = async (req, res) => {
  try {
    const username = req.user.username;
    await Todos.deleteOne({ username: username, todoname: req.body.todoname });
    res.end();
  } catch (e) {
    res.redirect("/");
  }
};

// Creating TODO

controller.post = (req, res) => {
  const username = req.user.username;
  Todos.create({ username: username, todoname: req.body.todoname, todostatus: "In Progress" });
  res.end();
};

// LOGIN/REGISTRATION LOGIC

controller.registerPost = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username && !password) {
    res.json({
      isUsernameEmpty: "Username field empty. Type a username.",
      isPasswordEmpty: "Passoword field empty. Type a password.",
    });
  } else if (!username) {
    res.json({ isUsernameEmpty: "Username field empty. Type a username." });
  } else if (!password) {
    res.json({ isPasswordEmpty: "Passoword field empty. Type a password." });
  } else {
    const hashSalt = genPassword(password);

    User.findOne({ username }, (err, user) => {
      if (err) {
        res.redirect("/");
      }

      if (user) {
        res.json({ userExists: `${user.username} already exists.` });
      } else {
        User.create({ username: username, hash: hashSalt.hash, salt: hashSalt.salt }, (err, user) => {
          if (err) {
            res.json({ err: err });
          } else {
            const tokenObject = issueJWT(user._id);

            res.json({ success: true, username: user.username, token: tokenObject.token, expires: tokenObject.expiresIn });
          }
        });
      }
    });
  }
};

controller.loginPost = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username && !password) {
    res.json({
      isUsernameEmpty: "Username field empty. Type a username to verify you or sig in.",
      isPasswordEmpty: "Password field empty. Type a password to verify you or sign in.",
    });
  } else if (!username) {
    res.json({ isUsernameEmpty: "Username field empty. Type a username to verify you or sig in." });
  } else if (!password) {
    res.json({ isPasswordEmpty: "Password field empty. Type a password to verify you or sign in." });
  } else {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        res.redirect("/");
      }

      if (!user) {
        res.json({ userNotFound: "User not found" });
      } else {
        const isValid = validatePassword(password, user.hash, user.salt);

        if (isValid) {
          const tokenObject = issueJWT(user._id);

          res.json({ success: true, username: username, token: tokenObject.token, expiresIn: tokenObject.expiresIn });
        } else {
          res.json({ success: false, isPasswordWrong: "You entered the wrong password" });
        }
      }
    });
  }
};

export default controller;
