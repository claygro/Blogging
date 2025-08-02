import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogs" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});
const UserModel = mongoose.model("users", userSchema);
export default UserModel;
