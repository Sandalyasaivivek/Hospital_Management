import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      await API.post('/auth/register', form);
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => nav('/login'), 1500);
    } catch (e) {
      setErr(e?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container" style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'80vh'}}>
      <div className="card" style={{maxWidth:400, width:'100%'}}>
        <h2 style={{textAlign:'center',color:'#1976d2'}}>Register</h2>
        <form onSubmit={submit}>
          <label style={{marginTop:8}}>Name</label>
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <label style={{marginTop:8}}>Email</label>
          <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <label style={{marginTop:8}}>Password</label>
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required />
          <label style={{marginTop:8}}>Role</label>
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:4,marginTop:12}}>Register</button>
          {err && <p className="err">{err}</p>}
          {success && <p style={{color:'green'}}>{success}</p>}
        </form>
      </div>
    </div>
  );
}
