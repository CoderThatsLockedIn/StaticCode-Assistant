import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview'; // Make sure this matches your file name for new code reviews
import ReviewDetail from './pages/ReviewDetail'; // The detail view we just created
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/Navbar'; // Optional if you have a global navbar component

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
        {/* Optional Navbar if your app uses one globally */}
        <Navbar />
        
        <Routes>
          {/* Public Authentication Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Application Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/review/new" element={<NewReview />} />
            <Route path="/review/:id" element={<ReviewDetail />} />
          </Route>

          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}