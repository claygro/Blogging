import { useNavigate } from "react-router-dom";
import connection from "../../config/Connection";

const Settings = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const logout = await connection.delete("/blog/logout");
      if (logout.status == 200) {
        localStorage.removeItem("isLogin");
        navigate("/login");
      }
      console.log(logout.status);
    } catch (error) {
      console.log(`Error in logout ${error}`);
    }
  };
  const handleAddAccount = () => {
    localStorage.removeItem("isLogin");
    navigate("/");
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-sm space-y-4">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>

          <button
            onClick={handleAddAccount}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add new account
          </button>
        </div>
      </div>
    </>
  );
};

export default Settings;
