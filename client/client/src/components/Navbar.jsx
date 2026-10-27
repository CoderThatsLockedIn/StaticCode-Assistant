import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <span className="font-bold text-white text-lg">StaticCode Assistant</span>
        <div className="flex space-x-4 text-sm">
          {/* CRITICAL: Use <Link to="..."> instead of <a href="..."> */}
          <Link to="/dashboard" className="text-zinc-300 hover:text-white transition">Dashboard</Link>
          <Link to="/new-review" className="text-zinc-300 hover:text-white transition">New Review</Link>
        </div>
      </div>
      <button 
        onClick={handleLogout}
        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-sm font-medium rounded-lg transition cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
}
