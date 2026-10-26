import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2.5 text-white no-underline">
        <span className="text-xl">⚡</span>
        <span className="font-bold tracking-tight text-lg">StaticCode Assistant</span>
      </Link>
      <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
        <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
        <Link to="/review/new" className="hover:text-white transition-colors">New Review</Link>
        <Link to="/login" className="hover:text-white transition-colors">Login</Link>
        <Link to="/register" className="hover:text-white transition-colors">Register</Link>
        <button 
          onClick={handleLogout} 
          className="px-3.5 py-1.5 rounded-lg bg-red-950/40 border border-red-900/50 text-red-400 hover:bg-red-900 hover:text-white transition-all cursor-pointer font-medium text-xs"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}