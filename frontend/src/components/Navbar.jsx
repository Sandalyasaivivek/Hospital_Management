import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ isLoggedIn }) {
  return (
    <nav style={{
      width: '100%',
      background: '#1976d2',
      color: '#fff',
      padding: '0 0',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',display:'flex',alignItems:'center',height:60}}>
        {/* Left: Logo */}
        <div style={{display:'flex',alignItems:'center'}}>
          <h2 style={{margin:'0 16px 0 0',fontWeight:700,letterSpacing:'-1px',fontSize:28}}>CityCare</h2>
        </div>
        {/* Center: Nav Links */}
        <div style={{display:'flex',gap:24,flex:1,marginLeft:32}}>
          {!isLoggedIn ? (
            <>
              <Link to="/" style={navLinkStyle}>Home</Link>
              <Link to="/about" style={navLinkStyle}>About Us</Link>
              <Link to="/contact" style={navLinkStyle}>Contact</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" style={navLinkStyle}>Dashboard</Link>
              <Link to="/patients" style={navLinkStyle}>Patients</Link>
              <Link to="/appointments" style={navLinkStyle}>Appointments</Link>
            </>
          )}
        </div>
        {/* Right: Auth Buttons */}
        {!isLoggedIn && (
          <div style={{display:'flex',alignItems:'center',gap:12,marginRight:16}}>
            <Link to="/login" style={buttonStyle}>Login</Link>
            <Link to="/register" style={{...buttonStyle,background:'#43a047'}}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

const navLinkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: 18,
  fontWeight: 500,
  padding: '8px 0',
  transition: 'color 0.2s',
};

const buttonStyle = {
  background: '#fff',
  color: '#1976d2',
  border: 'none',
  borderRadius: 5,
  padding: '6px 18px',
  fontWeight: 600,
  fontSize: 16,
  textDecoration: 'none',
  marginLeft: 0,
  cursor: 'pointer',
  transition: 'background 0.2s,color 0.2s',
  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
};
