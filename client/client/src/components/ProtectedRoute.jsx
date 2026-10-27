import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950 text-zinc-400 text-sm">
        Verifying session...
      </div>
    );
  }

  // If loading is finished and user exists, render the nested child routes via Outlet
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
