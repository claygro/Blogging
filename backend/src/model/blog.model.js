import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    username: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    title: String,
    blogs: String,
    image: String,
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  },
  {
    timestamps: true,
  }
);
const BlogModel = mongoose.model("blogs", blogSchema);
export default BlogModel;
