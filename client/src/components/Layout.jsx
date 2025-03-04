import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"; // Import Sidebar

const Layout = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar at the top */}
      <Navbar />
      {/* Sidebar & Content Container (fills remaining space) */}
      <div className="flex flex-grow">
        {/* Sidebar (Full Height) */}
        <Sidebar />
        {/* Main Content */}
        <main className="flex-grow p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
