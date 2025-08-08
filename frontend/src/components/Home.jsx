import { useNavigate } from "react-router-dom";
import { BlogContext } from "./BlogProvider";
import { useContext } from "react";
import { useEffect } from "react";
import connection from "../../config/Connection";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import SearchBlog from "./SearchBlog";
// import { jwtDecode } from "jwt-decode";
const Home = () => {
  const { blog, getBlog } = useContext(BlogContext);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [threeDotsClick, setThreeDotsClick] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("isLogin") === "false") {
      window.location.reload();
      navigate("/");
    }
  }, []);
  const redirectToLogin = async () => {
    try {
      const response = await connection.get("/blog/currentuser");
      const decode = jwtDecode(response.data);
      if (!decode) {
        navigate("/login");
      } else {
        setCurrentUserId(decode.userid);
      }
    } catch (err) {
      console.log(`error in redirecting to login page ${err}`);
      navigate("/login");
    }
  };
  useEffect(() => {
    redirectToLogin();
  }, []);
  const handleDelete = async (id) => {
    try {
      await connection.delete(`/blog/delete/${id}`);
      const data = await connection.get("/blog/currentuser");
      const decodeData = jwtDecode(data.data);
      if (!decodeData) {
        navigate("/login");
      }
      getBlog();
    } catch (err) {
      console.log(`error in delete ${err}`);
    }
  };
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
    if (!currentUserId) getCurrentUserId();
  });

  const handeThreeDotsClick = (id) => {
    setThreeDotsClick((prevId) => (prevId === id ? null : id));
  };
  return (
    <>
      <div>
        <SearchBlog setFilteredBlogs={setFilteredBlogs} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {(filteredBlogs ? filteredBlogs.length : blog.length) > 0
          ? (filteredBlogs || blog)
              .slice()
              .reverse()
              .map((b) => (
                <div
                  onClick={() => {
                    navigate("/blogShow", { state: { b } });
                  }}
                  key={b._id}
                  className="bg-white h-auto shadow-md rounded-lg p-4"
                >
                  <div className="relative">
                    <div className="flex justify-end items-center  ">
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
                        currentUserId === b.username[0]._id &&
                        threeDotsClick === b._id
                          ? " flex absolute bg-white shadow-md px-3 py-4 right-0 "
                          : "hidden"
                      }
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents navigation
                          handleDelete(b._id);
                        }}
                        className="text-red-800 cursor-pointer"
                      >
                        {currentUserId ? <MdDeleteOutline /> : ""}
                      </button>
                    </div>
                  </div>
                  <h1 className="text-sm text-zinc-600">
                    @{b.username[0].username}
                  </h1>
                  <img
                    src={`https://blogging-backend-zv4s.onrender.com${b.image}`}
                    className="w-full h-40 object-contain"
                    alt="image"
                  />
                  {/* {console.log(`http://localhost:8000${b.image}`)} */}
                  <h2 className="text-xl font-bold mb-2">{b.title}</h2>
                  <p className="text-gray-700">
                    {b.blogs
                      ? b.blogs.replace(/<[^>]+>/g, "").slice(0, 300) + "..."
                      : ""}
                  </p>
                  <button className="text-blue-700 hover:text-blue-600 active:text-blue-800 cursor-pointer">
                    Read blog
                  </button>
                </div>
              ))
          : "No blog to show"}
      </div>
    </>
  );
};

export default Home;
