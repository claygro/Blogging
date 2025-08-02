// src/pages/DashboardLayout.jsx
import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Dashboard</h2>
        <nav className="space-y-3 text-gray-700">
          <NavLink to="create" className="block hover:text-blue-500">
            Create Blog
          </NavLink>
          <NavLink to="myblogs" className="block hover:text-blue-500">
            My Blogs
          </NavLink>
          <NavLink to="settings" className="block hover:text-blue-500">
            Settings
          </NavLink>
        </nav>
      </aside>

      {/* Dynamic content via nested routes */}
      <main className="w-3/4 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
