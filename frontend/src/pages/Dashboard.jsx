import React from 'react';
import { FaUserMd, FaFlask, FaProcedures, FaSyringe, FaHospitalUser, FaUserNurse, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div style={{display:'flex',minHeight:'calc(100vh - 60px - 60px)',background:'#f6f7fb'}}>
      {/* Sidebar */}
      <aside style={{width:200,background:'linear-gradient(180deg,#7b2ff2 0%,#f357a8 100%)',color:'#fff',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:24}}>
        <div style={{fontWeight:700,fontSize:22,marginBottom:32,letterSpacing:'-1px'}}>Dashboard</div>
        <SidebarItem icon={<FaUserMd />} label="Staff" />
        {/* <SidebarItem icon={<FaFlask />} label="Lab" /> */}
        <SidebarItem icon={<FaProcedures />} label="Ward" />
        <SidebarItem icon={<FaSyringe />} label="Treatment" />
        <SidebarItem icon={<FaHospitalUser />} label="Pharmacy" />
        <SidebarItem icon={<FaUserNurse />} label="Patient" />
      </aside>

      {/* Main Content */}
      <div style={{flex:1,display:'flex',flexDirection:'column',minHeight:'100vh'}}>
        {/* Top Bar */}
        <div style={{height:60,background:'#fff',display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 32px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <div style={{fontWeight:700,fontSize:22,letterSpacing:'-1px',display:'flex',alignItems:'center'}}>
            <span style={{marginRight:8}}><FaHospitalUser />CityCare</span> 
          </div>
          <div style={{display:'flex',alignItems:'center',gap:24}}>
            <span style={{color:'#555',fontWeight:500}}>{user.name}</span>
            <span style={{color:'#888',fontWeight:400}}>{user.role}</span>
            <button onClick={logout} style={{background:'none',border:'none',color:'#d32f2f',fontSize:20,cursor:'pointer'}} title="Logout"><FaSignOutAlt /></button>
          </div>
        </div>

        {/* Staff Management Card */}
        <div style={{padding:32}}>
          <div style={{background:'#fff',borderRadius:12,boxShadow:'0 2px 8px rgba(0,0,0,0.07)',padding:24}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div style={{fontWeight:600,fontSize:20}}>Staff Management</div>
              <div style={{display:'flex',gap:12}}>
                <button style={{background:'#6c63ff',color:'#fff',border:'none',borderRadius:6,padding:'8px 18px',fontWeight:600}}>Generate Report</button>
                <input placeholder="ID" style={{padding:'8px 12px',border:'1px solid #ddd',borderRadius:6}} />
                <button style={{background:'#ffe082',color:'#333',border:'none',borderRadius:6,padding:'8px 18px',fontWeight:600}}>Search</button>
              </div>
            </div>
            <form style={{display:'flex',flexWrap:'wrap',gap:16}}>
              <input placeholder="First Name" style={inputStyle} />
              <input placeholder="Last Name" style={inputStyle} />
              <select style={inputStyle}><option>Role</option></select>
              <select style={inputStyle}><option>Gender</option></select>
              <input placeholder="Email" style={inputStyle} />
              <input placeholder="Mobile Number" style={inputStyle} />
              <textarea placeholder="Address" style={{...inputStyle,minWidth:'100%',height:40}} />
              <input placeholder="NIC" style={inputStyle} />
              <input placeholder="Date of Birth" type="date" style={inputStyle} />
              <input placeholder="Password" type="password" style={inputStyle} />
              <input placeholder="Confirm Password" type="password" style={inputStyle} />
              <div style={{display:'flex',gap:16,marginTop:8,width:'100%',justifyContent:'center'}}>
                <button type="button" style={{background:'#43a047',color:'#fff',border:'none',borderRadius:6,padding:'8px 32px',fontWeight:600}}>Register</button>
                <button type="button" style={{background:'#536dfe',color:'#fff',border:'none',borderRadius:6,padding:'8px 32px',fontWeight:600}}>Update</button>
                <button type="button" style={{background:'#ff3d00',color:'#fff',border:'none',borderRadius:6,padding:'8px 32px',fontWeight:600}}>Delete</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12,margin:'18px 0',cursor:'pointer',fontWeight:500,fontSize:17,opacity:0.93}}>
      <span style={{fontSize:22}}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

const inputStyle = {
  flex: '1 1 220px',
  minWidth: 180,
  padding: '10px 12px',
  border: '1px solid #ddd',
  borderRadius: 6,
  fontSize: 16,
  background: '#fafbfc',
};
