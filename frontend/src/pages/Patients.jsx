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

  return (
    <div>
      <h2>Patients</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
        <input placeholder="Age" value={form.age} onChange={e=>setForm({...form,age:e.target.value})} />
        <input placeholder="Gender" value={form.gender} onChange={e=>setForm({...form,gender:e.target.value})} />
        <input placeholder="Contact" value={form.contact} onChange={e=>setForm({...form,contact:e.target.value})} />
        <input placeholder="Notes" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} />
        <button type="submit">Add Patient</button>
        {err && <p className="err">{err}</p>}
      </form>

      <ul>
        {patients.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> — {p.age} — {p.gender} — {p.contact}
            <div>{p.notes}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
