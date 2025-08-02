import { useState } from "react";
import { RxEyeOpen } from "react-icons/rx";
import { GoEyeClosed } from "react-icons/go";
import signinImage from "../assets/signin.png";
import connection from "../../config/Connection";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
const SignupForm = () => {
  const [alterPassword, setAlterPassword] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const login = localStorage.getItem("isLogin");
    if (login === "true") navigate("/home");
  });
  const handleAlterPassword = () => {
    setAlterPassword(!alterPassword);
  };
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connection.post("/blog/signup", { ...userData });
      e.target.reset();
      localStorage.setItem("isLogin", true);
      navigate("/home");
    } catch (err) {
      toast(err.response.data.message);
      console.log(`error in singup the user ${err}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center p-4">
        <ToastContainer />
        <div className="w-[400px]">
          <div>
            <img
              src={signinImage}
              alt="signin image"
              width="100"
              height="100"
              className="m-auto"
            />
            <h1 className=" text-center  mb-4 text-xl">Create Account</h1>
          </div>
          <form
            action=""
            className="bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-12"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <div className="border-gray-300 border-[1px]  py-1 w-full rounded-md">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className=" border-none outline-none px-2 w-full"
                  placeholder="Enter your username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full name
              </label>
              <div className="border-gray-300 border-[1px]  py-1 rounded-md">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-none outline-none px-2 w-full"
                  placeholder="Enter your name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <div className="border-gray-300 border-[1px]  py-1 rounded-md">
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="border-none outline-none px-2 w-full"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="border-gray-300 border-[1px]  py-1 rounded-md flex items-center justify-between px-1 ">
                <input
                  type={!alterPassword ? "password" : "text"}
                  name="password"
                  id="password"
                  className="border-none outline-none px-2 w-full"
                  placeholder="Enter your password"
                  onChange={handleChange}
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
            </div>
            <div className="mt-2">
              <button className="bg-linear-30 from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-4 py-1 w-full rounded-md text-white text-md cursor-pointer font-semibold ">
                Signup
              </button>
            </div>
            <button
              type="button"
              className="text-sm text-center mt-4 text-gray-600"
            >
              Already have an account?{" "}
              <NavLink to="/login" className="text-blue-500 hover:underline">
                login
              </NavLink>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
