import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview'; // Make sure this file exists in your pages folder!
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

// Protected Route wrapper that waits for loading to finish
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400 text-sm">
        Verifying session...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

// Layout wrapper that keeps the Navbar persistent across authenticated pages
const MainLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes wrapped with the persistent Navbar Layout */}
      <Route 
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-review" element={<NewReview />} />
      </Route>

      {/* Fallback redirect */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
