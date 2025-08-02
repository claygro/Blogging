import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r  sticky top-0 left-0 right-0 from-blue-600 to-cyan-600 p-4 shadow-md">
      <ul className="flex gap-6 justify-between items-center text-white font-semibold text-lg">
        <li>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-200"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-200"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-200"
            }
          >
            Dashboard
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
