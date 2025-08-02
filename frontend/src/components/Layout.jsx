import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <div>
        <div className="sticky top-0 right-0 left-0 z-[999]">
          <Navbar />
        </div>

        <Outlet />
      </div>
    </>
  );
};

export default Layout;
