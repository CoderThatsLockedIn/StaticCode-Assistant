import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', { username, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-2">Create an account</h2>
      <p className="text-sm text-zinc-400 mb-6">Get started with your static code analysis assistant.</p>
      {error && <div className="mb-4 p-3 bg-red-950 border border-red-900 text-red-300 rounded-lg text-sm">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Username</label>
          <input 
            type="text" 
            placeholder="johndoe" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Email Address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>
        <button type="submit" className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-emerald-600/20 text-sm cursor-pointer">
          Create Account
        </button>
      </form>
      <p className="mt-6 text-center text-sm text-zinc-400">
        Already have an account? <Link to="/login" className="text-indigo-400 font-medium hover:underline">Login</Link>
      </p>
    </div>
  );
}