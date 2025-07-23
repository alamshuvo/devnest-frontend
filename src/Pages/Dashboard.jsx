import React from "react";
import { Link } from "react-router-dom";
import Task from "./Task";

const Dashboard = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 font-fustat px-4">
        <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
          <h2 className="text-xl font-bold text-red-600 mb-4">Access Denied For Task Related Work</h2>
          <p className="text-gray-700 mb-4">
            You don't have a valid token. Please log in to access the all task related work!!.
          </p>
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
  
     <Task></Task>
    
  );
};

export default Dashboard;
