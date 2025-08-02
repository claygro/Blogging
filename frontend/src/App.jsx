import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import Layout from "./components/Layout"; // ✅ Contains the Navbar
import Home from "./components/Home";
import About from "./components/About";
import DashboardLayout from "./components/DashboardLayout";
import CreateBlog from "./components/CreateBlog";
import MyBlogs from "./components/MyBlogs";
import Settings from "./components/Settings";
import BlogProvider from "./components/BlogProvider";
import Login from "./components/Login";
import BlogShow from "./components/BlogShow";
import ProfileBlogShow from "./components/ProfileBlogShow";

function App() {
  return (
    <>
      <BlogProvider>
        <Router>
          <Routes>
            {/* ❌ No navbar for these */}
            <Route path="/" element={<SignupForm />} />
            <Route path="/login" element={<Login />} />
            {/* ✅ Navbar for these via Layout wrapper */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blogShow" element={<BlogShow />} />
              <Route path="/profileBlogShow" element={<ProfileBlogShow />} />
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<CreateBlog />} />
                <Route path="create" element={<CreateBlog />} />
                <Route path="myblogs" element={<MyBlogs />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </BlogProvider>
    </>
  );
}
export default App;
