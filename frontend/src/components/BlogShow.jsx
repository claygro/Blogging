import { useLocation } from "react-router-dom";
import Comments from "./Comments";
import { useState } from "react";

const BlogShow = () => {
  const blogs = useLocation().state.b;
  const [showComment, setShowComment] = useState(false);

  const handleShowComment = () => {
    setShowComment(!showComment);
  };

  return (
    <>
      <section className="min-h-screen bg-gray-100 py-10">
        <div
          key={blogs._id}
          className="w-full min-h-screen sm:max-w-4xl sm:rounded-lg sm:shadow-md sm:mx-auto sm:p-6 p-4 bg-white"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mt-6 mb-4 text-gray-800 leading-tight text-center">
            {blogs.title}
          </h1>
          <div className="w-full h-60 sm:h-80 md:h-96 overflow-hidden rounded-md">
            <img
              src={`https://blogging-backend-zv4s.onrender.com${blogs.image}`}
              alt="image"
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="prose prose-sm sm:prose md:prose-lg lg:prose-xl max-w-none text-gray-700 blog-content mt-6"
            dangerouslySetInnerHTML={{ __html: blogs.blogs }}
          />

          {/* Fixed centered comment box */}
          <div
            className={
              showComment ? "fixed bottom-0 left-0 right-0  z-[999]" : "hidden"
            }
          >
            <Comments
              blogs={blogs}
              setShowComment={setShowComment}
              showComment={showComment}
            />
          </div>
        </div>

        {/* Comment button */}
        <div className="w-full mt-4 sm:max-w-4xl sm:rounded-lg sm:shadow-md sm:mx-auto sm:p-6 p-4 bg-gray-400">
          <button
            className="bg-white shadow-lg px-4 py-2 rounded-md cursor-pointer"
            onClick={handleShowComment}
          >
            Comment
          </button>
        </div>
      </section>
    </>
  );
};

export default BlogShow;
