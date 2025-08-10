import { useLocation, useNavigate } from "react-router-dom";
import connection from "../../config/Connection";
import Comments from "./Comments";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // fixed import for jwtDecode
import { FaHeart } from "react-icons/fa";

const BlogShow = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogs = location.state?.b;

  const [showComment, setShowComment] = useState(false);
  const [like, setLike] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [currUserId, setCurrUserId] = useState(null);

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  useEffect(() => {
    const redirectToLoginAndFetchLikes = async () => {
      if (!blogs) {
        navigate("/login");
        return;
      }

      try {
        // Get current user
        const response = await connection.get("/blog/currentuser");
        const decode = jwtDecode(response.data);
        setCurrUserId(decode.userid);

        // Fetch likes for this blog immediately after getting user ID
        const likeResponse = await connection.get(`/blog/like/${blogs._id}`);
        setLike(likeResponse.data);
        setIsLike(likeResponse.data.likes.includes(decode.userid));
      } catch (err) {
        console.log(`error in redirecting to login page ${err}`);
        navigate("/login");
      }
    };

    redirectToLoginAndFetchLikes();
  }, [blogs, navigate]);

  const onHandleLike = async (id) => {
    try {
      // Ideally change this endpoint to POST for toggling likes on backend
      const response = await connection.get(`/blog/like/${id}`);
      setLike(response.data);
      if (currUserId && response.data.likes.includes(currUserId)) {
        setIsLike(true);
      } else {
        setIsLike(false);
      }
    } catch (error) {
      console.log(`Error in like ${error}`);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-10">
      <div
        key={blogs?._id}
        className="w-full min-h-screen sm:max-w-4xl sm:rounded-lg sm:shadow-md sm:mx-auto sm:p-6 p-4 bg-white"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-4 text-gray-800 leading-tight text-center">
          {blogs?.title}
        </h1>
        <div className="w-full h-60 sm:h-80 md:h-96 overflow-hidden rounded-md">
          <img
            src={`https://blogging-backend-zv4s.onrender.com${blogs?.image}`}
            alt="image"
            className="w-full h-full object-contain"
          />
        </div>
        <div
          className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none text-gray-700 blog-content mt-6"
          dangerouslySetInnerHTML={{ __html: blogs?.blogs }}
        />
        <div
          className={
            showComment ? "fixed bottom-0 left-0 right-0 z-[999]" : "hidden"
          }
        >
          <Comments
            blogs={blogs}
            setShowComment={setShowComment}
            showComment={showComment}
          />
        </div>
      </div>

      {/* Comment, like button */}
      <div className="w-full flex items-center justify-between mt-4 sm:max-w-4xl sm:rounded-lg sm:shadow-md sm:mx-auto sm:p-6 p-4 bg-gray-400">
        <button
          className="bg-white shadow-lg px-4 py-2 rounded-md cursor-pointer"
          onClick={handleShowComment}
        >
          Comment
        </button>
        <div className="flex items-center gap-2">
          <p>{like?.likes.length || 0}</p>
          <button
            className="cursor-pointer"
            onClick={() => onHandleLike(blogs?._id)}
            aria-label="Toggle like"
          >
            <FaHeart
              className={isLike ? "text-red-500 text-xl" : "text-white text-xl"}
            />
          </button>
        </div>
        {/* <button
          className="bg-white shadow-lg px-4 py-2 rounded-md cursor-pointer"
          onClick={handleShowComment}
        >
          Share
        </button> */}
      </div>
    </section>
  );
};

export default BlogShow;
