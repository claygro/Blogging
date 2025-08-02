import { useState } from "react";
import connection from "../../config/Connection";
import { useEffect } from "react";

const SearchBlog = ({ setFilteredBlogs }) => {
  const [query, setQuery] = useState("");
  const [responseData, setResponseData] = useState(null);

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await connection.get(`/blog/search/?title=${query}`);
      setResponseData(response.data);
    } catch (error) {
      console.log(`Error in searching the blogs ${error}`);
    }
  };

  useEffect(() => {
    if (responseData) {
      setFilteredBlogs(responseData); // Pass the data to parent component
    }
  }, [responseData, setFilteredBlogs]); // Depend on responseData to trigger useEffect

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form
        onSubmit={onHandleSubmit}
        className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-md"
      >
        <input
          className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search blogs by title..."
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBlog;
