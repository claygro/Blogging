import { useState, useContext } from "react";
import connection from "../../config/Connection";
import RichTextEditor from "./RichTextEditor";
import { ToastContainer, toast } from "react-toastify";
import { BlogContext } from "./BlogProvider";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { getBlog } = useContext(BlogContext);
  const [changeBlog, setChangeBlog] = useState({});
  const [imageData, setImageData] = useState();

  const handleBlogChange = (e) => {
    setChangeBlog({ ...changeBlog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connection.post(
        "/blog/postBlog",
        {
          ...changeBlog,
          image: imageData,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      e.target.reset();
      getBlog();
      toast("Added blog.");
    } catch (err) {
      console.log(`Error in creating blog ${err.response.data.message}`);
      if (err.response.data.message) {
        localStorage.setItem("isLogin", false);
        navigate("/login");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Create a New Blog
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded shadow-md max-w-4xl mx-auto"
      >
        {/* File input */}
        <div className="mb-4">
          <input
            type="file"
            name="image"
            onChange={(e) => setImageData(e.target.files[0])}
            required
            className="w-full text-gray-700 border border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Title input */}
        <div>
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            onChange={handleBlogChange}
            name="title"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* RichTextEditor component */}
        <div className="mt-4">
          <RichTextEditor onChange={handleBlogChange} />
        </div>

        {/* Submit button */}
        <div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateBlog;
