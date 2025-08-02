import { useState } from "react";
import connection from "../../config/Connection";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const [alterPassword, setAlterPassword] = useState(false);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await connection.post("/blog/login", { ...loginData });
      localStorage.setItem("isLogin", true);
      navigate("/home");
    } catch (err) {
      toast(err.response.data.message);
      console.log(`error in login ${err}`);
    }
  };
  const handleAlterPassword = () => {
    setAlterPassword(!alterPassword);
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 px-4">
      <ToastContainer />
      <form
        onSubmit={handleLoginSubmit}
        className="bg-white shadow-md rounded-2xl p-8  w-[400px]"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        <div className="border-gray-300 border-[1px]  py-1 rounded-md">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleLoginChange}
            className="border-none outline-none px-2 w-full"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="border-gray-300 border-[1px] mt-4  py-1 rounded-md flex items-center justify-between px-1 ">
          <input
            type={!alterPassword ? "password" : "text"}
            name="password"
            id="password"
            className="border-none outline-none px-2 w-full"
            placeholder="Enter your password"
            onChange={handleLoginChange}
            required
          />
          <button
            type="button"
            className="cursor-pointer"
            onClick={handleAlterPassword}
          >
            {!alterPassword ? <RxEyeOpen /> : <GoEyeClosed />}
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 mt-4 text-white py-3 rounded-xl hover:bg-blue-600 transition duration-300 font-semibold"
        >
          Login
        </button>

        <button
          type="button"
          className="text-sm text-center mt-4 text-gray-600"
        >
          Don’t have an account?{" "}
          <NavLink to="/" className="text-blue-500 hover:underline">
            Sign up
          </NavLink>
        </button>
      </form>
    </div>
  );
};

export default Login;
