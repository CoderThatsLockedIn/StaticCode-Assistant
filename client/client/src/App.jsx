import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview';
import ReviewDetail from './pages/ReviewDetail';

// Importing your actual modular components from your codebase
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/MainLayout'; // Or however your layout component is named

export default function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes using your actual imported components */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-review" element={<NewReview />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
