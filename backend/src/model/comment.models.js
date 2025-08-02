import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "blogs" }],
  username: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  comment: String,
});
const CommentModel = mongoose.model("comment", commentSchema);
export default CommentModel;
