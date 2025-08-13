import React, { useEffect, useState } from 'react';
import API from '../api';

export default function Appointments(){
  const [appts, setAppts] = useState([]);
  const [form, setForm] = useState({ patient_id:'', doctor_id:'', scheduled_at:'', reason:'' });
  const [err, setErr] = useState('');

  const fetch = async () => {
    try {
      const res = await API.get('/appointments');
      setAppts(res.data);
    } catch (e) { console.error(e); }
  };

  useEffect(()=>{ fetch(); },[]);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    // Check all fields
    if (!form.patient_id || !form.doctor_id || !form.scheduled_at || !form.reason) {
      setErr('All fields are mandatory');
      return;
    }
    try {
      await API.post('/appointments', form);
      setForm({ patient_id:'', doctor_id:'', scheduled_at:'', reason:'' });
      fetch();
    } catch (e) {
      setErr(e?.response?.data?.message || 'Failed to create appointment');
    }
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/appointments/${id}/status`, { status });
    fetch();
  };

  // Only allow staff to access appointments page
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const staffRoles = ['Admin','Doctor','Nurse','Receptionist'];
  if (!staffRoles.includes(user.role)) {
    return (
      <div className="container" style={{maxWidth:500,margin:'0 auto',marginTop:32}}>
        <div className="card" style={{textAlign:'center'}}>
          <h2>Access Denied</h2>
          <p>You do not have permission to view appointments.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="container" style={{maxWidth:700,margin:'0 auto',marginTop:32}}>
      <div className="card" style={{maxWidth:500,margin:'0 auto'}}>
        <h2 style={{textAlign:'center',color:'#1976d2'}}>Appointments</h2>
        <form onSubmit={submit}>
          <input placeholder="Patient ID" value={form.patient_id} onChange={e=>setForm({...form,patient_id:e.target.value})} />
          <input placeholder="Doctor ID" value={form.doctor_id} onChange={e=>setForm({...form,doctor_id:e.target.value})} />
          <input placeholder="Scheduled At (YYYY-MM-DD HH:mm)" value={form.scheduled_at} onChange={e=>setForm({...form,scheduled_at:e.target.value})} />
          <input placeholder="Reason" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})} />
          <button type="submit" style={{background:'#1976d2',color:'#fff',border:'none',borderRadius:4}}>Create</button>
          {err && <p className="err">{err}</p>}
        </form>
      </div>
      <div className="card" style={{marginTop:24}}>
        <h3 style={{color:'#333'}}>Appointment List</h3>
        <ul style={{listStyle:'none',padding:0}}>
          {appts.map(a => (
            <li key={a.id} style={{padding:'10px 0',borderBottom:'1px solid #eee',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <strong>Patient:</strong> {a.patient_id} <strong>Doctor:</strong> {a.doctor_id}<br/>
                <span style={{color:'#555'}}>At:</span> {a.scheduled_at} <span style={{color:'#888',fontSize:13}}>{a.reason}</span>
              </div>
              <div>
                <span style={{marginRight:8,color:a.status==='completed'?'#388e3c':'#1976d2'}}>{a.status}</span>
                {a.status!=='completed' && (
                  <button style={{background:'#388e3c',color:'#fff',border:'none',borderRadius:4}} onClick={()=>updateStatus(a.id,'completed')}>Mark Complete</button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
