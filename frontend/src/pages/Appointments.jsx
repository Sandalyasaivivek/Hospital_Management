import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Appointments(){
  const [appts, setAppts] = useState([]);
  const [form, setForm] = useState({ patient_id:'', doctor_id:'', scheduled_at:'', reason:'' });

  const fetch = async () => {
    try {
      const res = await API.get('/appointments');
      setAppts(res.data);
    } catch (e) { console.error(e); }
  };
  useEffect(()=>{ fetch(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/appointments', form);
    setForm({ patient_id:'', doctor_id:'', scheduled_at:'', reason:'' });
    fetch();
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/appointments/${id}/status`, { status });
    fetch();
  };

  return (
    <div>
      <h2>Appointments</h2>
      <form onSubmit={submit} className="card">
        <input placeholder="patient_id" value={form.patient_id} onChange={e=>setForm({...form,patient_id:e.target.value})} />
        <input placeholder="doctor_id" value={form.doctor_id} onChange={e=>setForm({...form,doctor_id:e.target.value})} />
        <input placeholder="scheduled_at (YYYY-MM-DD HH:mm)" value={form.scheduled_at} onChange={e=>setForm({...form,scheduled_at:e.target.value})} />
        <input placeholder="reason" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
        <button type="submit">Create</button>
      </form>

      <ul>
        {appts.map(a => (
          <li key={a.id}>
            <strong>{a.patient_name}</strong> with <em>{a.doctor_name || 'Unassigned'}</em> at {new Date(a.scheduled_at).toLocaleString()} — {a.status}
            <div>
              <button onClick={()=>updateStatus(a.id,'completed')}>Mark Completed</button>
              <button onClick={()=>updateStatus(a.id,'cancelled')}>Cancel</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
