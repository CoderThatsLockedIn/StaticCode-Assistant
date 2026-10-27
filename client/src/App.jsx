import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import NewReview from './pages/NewReview';
import ReviewDetail from './pages/ReviewDetail';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={
          <div className="min-h-screen bg-zinc-950 text-white">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 py-6">
              <Outlet />
            </main>
          </div>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-review" element={<NewReview />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
