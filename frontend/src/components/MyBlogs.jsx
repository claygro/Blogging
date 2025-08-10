import { useEffect, useState, useContext } from "react";
import connection from "../../config/Connection";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BlogContext } from "./BlogProvider";

const MyBlogs = () => {
  const { getBlog } = useContext(BlogContext);
  const [userBlogs, setUserBlogs] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [threeDotsClick, setThreeDotsClick] = useState(false);
  const navigate = useNavigate();

  // Fetch current user's blogs
  async function UserBlogs() {
    try {
      const blogs = await connection.get("/blog/profile");
      setUserBlogs([blogs.data]);
    } catch (error) {
      console.log(`Error in myblogs ${error}`);
    }
  }

  useEffect(() => {
    UserBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    try {
      const data = await connection.get("/blog/currentuser");
      const decodeData = jwtDecode(data.data);
      if (!decodeData) {
        navigate("/login");
        return;
      }
      await connection.delete(`/blog/delete/${id}`);

      getBlog(); // global update
      UserBlogs(); // local refresh ✅
    } catch (err) {
      console.log(`error in delete ${err}`);
    }
  };

  // Fetch current user ID
  async function getCurrentUserId() {
    try {
      const data = await connection.get("/blog/currentuser");
      const decodeData = jwtDecode(data.data);
      setCurrentUserId(decodeData.userid);
    } catch (error) {
      console.log(`Cannot get current user ${error}`);
    }
  }

  useEffect(() => {
    getCurrentUserId();
  }, []); // ✅ added missing dependency array

  // Toggle three dots menu
  const handeThreeDotsClick = (id) => {
    setThreeDotsClick((prevId) => (prevId === id ? null : id));
  };

  return (
    <>
      <div className="text-3xl font-bold text-center my-6 text-gray-800">
        Your Blogs
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {userBlogs.length > 0 ? (
          userBlogs.map((blog) => (
            <div key={blog._id} className="mb-10">
              <h1 className="text-xl font-semibold mb-4 text-gray-700">
                Author: {blog.username}
              </h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {blog.blogs.map((b) => (
                  <div
                    key={b._id}
                    className="bg-white py-4 px-3 rounded-2xl shadow-md overflow-hidden border border-gray-200"
                    onClick={() => {
                      navigate("/profileBlogShow", { state: { b } });
                    }}
                  >
                    <div className="relative">
                      <div className="flex justify-end items-center">
                        <button
                          className="text-xl cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handeThreeDotsClick(b._id);
                          }}
                        >
                          <BsThreeDotsVertical />
                        </button>
                      </div>

                      <div
                        className={
                          currentUserId === b.username[0] &&
                          threeDotsClick === b._id
                            ? "flex absolute bg-white shadow-md px-3 py-4 right-0 z-10"
                            : "hidden"
                        }
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(b._id);
                          }}
                          className="text-red-800 cursor-pointer"
                        >
                          <MdDeleteOutline />
                        </button>
                      </div>
                    </div>

                    <img
                      src={`https://blogging-backend-zv4s.onrender.com${b.image}`}
                      alt="blog"
                      className="w-full h-48 object-contain mt-3"
                    />

                    <div className="p-4">
                      <h1 className="text-lg font-bold text-gray-800 mb-2">
                        {b.title}
                      </h1>
                      <p className="text-gray-700">
                        {b.blogs
                          ? b.blogs.replace(/<[^>]+>/g, "").slice(0, 20) +
                            "......."
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-70 z-50">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyBlogs;
