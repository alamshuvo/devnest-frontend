import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email) return toast.error("Please enter your email.");

    // Dummy token
    const fakeToken = Math.random().toString(36).substring(2);
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("email", email);

    toast.success("Login successful!");

    if (onLogin) {
      onLogin();
    }

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-fustat px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Login</h2>
          <Link
            to="/"
            className="text-sm text-blue-600 hover:underline hover:text-blue-700 transition"
          >
            Home
          </Link>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter dummy email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
