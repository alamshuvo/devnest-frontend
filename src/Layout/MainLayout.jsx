import { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const MainLayout = () => {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col font-fustat">
      {/* Navbar */}
      <nav className="bg-[#eff6ff] text-black px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
        <div className="text-2xl font-bold">TaskTracker</div>

        <div className="flex flex-col sm:flex-row items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
          {token && (
            <Link to="/" className="hover:underline">
              Tasks
            </Link>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded w-full sm:w-auto"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="w-full sm:w-auto">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded w-full sm:w-auto">
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1 p-4 sm:p-6 bg-gray-100">
        <Outlet context={{ token }} />
      </main>
    </div>
  );
};

export default MainLayout;
