import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import API from '../services/api';

export default function PublicRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    API.get('/auth/verify')
      .then((res) => setIsAuthenticated(res.data.isAuthenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return null;
  }

  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}