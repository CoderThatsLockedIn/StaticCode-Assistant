import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // 1. While checking token/cookie, render nothing (prevents UI flashing)
  if (loading) {
    return null; 
  }

  // 2. Once loaded, if user exists show children, otherwise redirect
  return user ? children : <Navigate to="/login" replace />;
}
