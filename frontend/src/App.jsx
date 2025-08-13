
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Check login status from localStorage
  const isLoggedIn = Boolean(localStorage.getItem('token'));
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <div style={{paddingTop:70, paddingBottom:60, minHeight:'100vh', boxSizing:'border-box'}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/patients" element={<ProtectedRoute><Patients /></ProtectedRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
