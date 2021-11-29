import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  username: String,
  salt: String,
  hash: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
