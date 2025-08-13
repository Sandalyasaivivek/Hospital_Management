import React from 'react';

export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, <strong>{user.name}</strong> — Role: <em>{user.role}</em></p>
      <button onClick={logout}>Logout</button>
      <hr />
      <div>
        <p>Use the navigation to manage patients and appointments.</p>
      </div>
    </div>
  );
}
