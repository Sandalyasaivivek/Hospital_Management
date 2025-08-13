import React, { useState } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      nav('/');
    } catch (e) {
      setErr(e?.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{minHeight:'100vh',background:'#e3f2fd',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{maxWidth:1200, width:'100%', display:'flex', justifyContent:'center', alignItems:'center', gap:60}}>
        <div style={{flex:1, minWidth:320, maxWidth:480, padding:'0 24px'}}>
          <h1 style={{color:'#1976d2',fontSize:44,marginBottom:0,fontWeight:700,letterSpacing:'-1px'}}>CityCare Hospital</h1>
          <p style={{fontSize:22,marginTop:8, color:'#333',fontWeight:500}}>Your health, our priority.<br/>Book appointments, manage patients, and connect with our expert staff.</p>
        </div>
        <div style={{flex:1, minWidth:320, maxWidth:400}}>
          <div style={{background:'#fff',borderRadius:8,boxShadow:'0 2px 8px rgba(0,0,0,0.1)',padding:'32px 24px 24px 24px',marginBottom:16}}>
            <form onSubmit={submit}>
              <input
                value={email}
                onChange={e=>setEmail(e.target.value)}
                type="email"
                autoComplete="username"
                placeholder="Email address"
                style={{width:'100%',padding:'14px 16px',marginBottom:12,border:'1px solid #ddd',borderRadius:6,fontSize:17}}
              />
              <input
                type="password"
                value={password}
                onChange={e=>setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Password"
                style={{width:'100%',padding:'14px 16px',marginBottom:12,border:'1px solid #ddd',borderRadius:6,fontSize:17}}
              />
              <button
                type="submit"
                style={{width:'100%',background:'#1976d2',color:'#fff',fontWeight:700,fontSize:20,padding:'12px 0',border:'none',borderRadius:6,marginBottom:12,marginTop:4,boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}
              >
                Log In
              </button>
              {err && <p className="err" style={{textAlign:'center',margin:0}}>{err}</p>}
            </form>
            <hr style={{margin:'18px 0'}} />
            <button
              type="button"
              style={{width:'100%',background:'#43a047',color:'#fff',fontWeight:700,fontSize:17,padding:'12px 0',border:'none',borderRadius:6,marginTop:0,boxShadow:'0 1px 2px rgba(0,0,0,0.05)'}}
              onClick={()=>nav('/register')}
            >
              Create New Account
            </button>
          </div>
          <p style={{textAlign:'center',fontSize:14,marginTop:8}}>
            <span style={{color:'#1976d2'}}>Welcome to CityCare Hospital Management System.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
