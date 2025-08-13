import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Patients(){
  const [patients, setPatients] = useState([]);
  const [form, setForm] = useState({ name:'', age:'', gender:'', contact:'', notes:''});
  const [err, setErr] = useState('');

  const fetch = async () => {
    try{
      const res = await API.get('/patients');
      setPatients(res.data);
    }catch(e){ console.error(e); }
  };

  useEffect(()=>{ fetch(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try{
      await API.post('/patients', form);
      setForm({ name:'', age:'', gender:'', contact:'', notes:'' });
      fetch();
    }catch(e){
      setErr(e?.response?.data?.message || 'Failed');
    }
  };

  // Only allow patients to fill the form, staff can view all
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.role === 'Patient') {
    return (
      <div className="container">
        <div className="card" style={{maxWidth:500, margin:'0 auto', marginTop:32}}>
          <h2 style={{textAlign:'center', color:'#1976d2'}}>Patient Registration</h2>
          <form onSubmit={submit}>
            <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
            <input placeholder="Gender" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} />
            <input placeholder="Contact" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
            <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
            <button type="submit" style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:4}}>Submit</button>
            {err && <p className="err">{err}</p>}
          </form>
        </div>
      </div>
    );
  }
  // Staff view
  return (
    <div className="container">
      <div className="card" style={{marginTop:24}}>
        <h3 style={{color:'#333'}}>Patient List</h3>
        <ul style={{listStyle:'none',padding:0}}>
          {patients.map(p => (
            <li key={p.id} style={{padding:'8px 0',borderBottom:'1px solid #eee'}}>
              <strong>{p.name}</strong> ({p.gender}, {p.age})<br/>
              <span style={{color:'#555'}}>Contact:</span> {p.contact} <span style={{color:'#aaa',fontSize:13}}>{p.notes}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
