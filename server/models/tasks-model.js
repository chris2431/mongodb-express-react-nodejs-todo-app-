import mongoose from "mongoose";
const { Schema } = mongoose;

const TasksSchema = new Schema({
  username: String,
  todoname: String,
  todostatus: String,
});

const Todos = mongoose.model("Todos", TasksSchema);

export default Todos;
