import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/">Dashboard</Link> | <Link to="/patients">Patients</Link> | <Link to="/appointments">Appointments</Link>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
