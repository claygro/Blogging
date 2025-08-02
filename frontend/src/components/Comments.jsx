import { useEffect, useState } from "react";
import connection from "../../config/Connection";
import { IoSendSharp } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { MdDeleteOutline } from "react-icons/md";
const Comments = ({ blogs, setShowComment, showComment }) => {
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [currentUsersId, setCurrentUsersId] = useState(null);
  // Fetch comments
  async function getComment() {
    try {
      const response = await connection.get(`/blog/getComment/${blogs._id}`);
      setAllComment(response.data.comment);
    } catch (err) {
      console.log(`Error in get blog ${err}`);
    }
  }

  useEffect(() => {
    getComment();
  }, []);

  // Submit new comment
  const handleCommentSubmit = async () => {
    try {
      await connection.post("/blog/comment", {
        comment,
        blogId: blogs._id,
      });
      setComment("");
      getComment(); // refresh comments
    } catch (error) {
      console.log(`Error in comment ${error}`);
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };
  const handleCloseComment = () => {
    setShowComment(!showComment);
  };
  // console.log(allComment);

  //delete comment.
  const handleDeleteComment = async (id) => {
    try {
      await connection.delete(`/blog/deleteComment/${id}`);
      getComment();
    } catch (error) {
      console.log(`Error in deleting the comment ${error}`);
    }
  };
  //getting current user id.
  async function currentUserId() {
    try {
      const response = await connection.get("/blog/currentuser");
      // console.log(response.data);
      const data = jwtDecode(response.data);
      // console.log(data.userid);
      setCurrentUsersId(data.userid);
    } catch (err) {
      console.log(`cannot get current user id ${err}`);
    }
  }
  // console.log(currentUsersId);
  useEffect(() => {
    currentUserId();
  }, []);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col w-[500px] h-[550px]  mx-auto border rounded-md overflow-hidden bg-white shadow">
          {/* Scrollable Comments */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
            <div className="flex justify-end py-2">
              <button onClick={handleCloseComment}>
                <FaXmark className="text-2xl cursor-pointer" />
              </button>
            </div>
            {allComment.length > 0 ? (
              allComment
                .slice()
                .reverse()
                .map((comments) => (
                  <div
                    key={comments._id}
                    className="bg-gray-100 p-2 rounded-md shadow-sm"
                  >
                    <p>{comments.username[0].username}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm whitespace-normal">
                        {comments.comment}
                      </p>
                      <div
                        onClick={() => handleDeleteComment(comments._id)}
                        className="px-3 py-3 rounded-full hover:bg-white hover:shadow-md cursor-pointer"
                      >
                        <button
                          className={
                            currentUsersId == comments.username[0]._id
                              ? "flex cursor-pointer"
                              : "hidden"
                          }
                        >
                          <MdDeleteOutline className="text-red-500 text-lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <div>No comments</div>
            )}
          </div>

          {/* Fixed Input Area */}
          <div className="border-t px-4 py-2 flex items-center gap-2 bg-white">
            <input
              value={comment}
              onChange={handleCommentChange}
              className="flex-1 border rounded-md p-2"
              type="text"
              placeholder="Write a comment..."
            />
            <button
              onClick={handleCommentSubmit}
              className="p-2 hover:bg-gray-200 rounded-full"
            >
              <IoSendSharp className="text-blue-600 text-xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
