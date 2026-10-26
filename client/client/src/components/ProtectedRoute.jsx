import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import API from '../services/api';

export default function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    API.get('/auth/verify')
      .then((res) => setIsAuthenticated(res.data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-zinc-400 text-sm">
        Verifying session...
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}