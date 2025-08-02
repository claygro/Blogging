import { useEffect, useState, createContext } from "react";
import connection from "../../config/Connection";
const BlogContext = createContext();
const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState([]);

  async function getBlog() {
    try {
      const response = await connection.get("/blog/getBlog");
      setBlog(response.data);
    } catch (error) {
      console.log(`Error in getting blog ${error}`);
    }
  }
  // console.log(blog);
  useEffect(() => {
    getBlog();
  }, []);

  return (
    <>
      <BlogContext.Provider value={{ blog, setBlog, getBlog }}>
        {children}
      </BlogContext.Provider>
    </>
  );
};
export { BlogContext };
export default BlogProvider;
