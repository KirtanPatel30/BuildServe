import React, { useState } from 'react';
import './globals.css';
import { INITIAL_REQUESTS, WORKERS } from './data';

// Resident screens
import ResidentDashboard    from './components/resident/ResidentDashboard';
import ReportFlow           from './components/resident/ReportFlow';
import ResidentRequests     from './components/resident/ResidentRequests';
import ResidentNotifications from './components/resident/ResidentNotifications';
import ResidentProfile      from './components/resident/ResidentProfile';

// Manager screens
import ManagerDashboard     from './components/manager/ManagerDashboard';
import ManagerRequests      from './components/manager/ManagerRequests';
import ManagerWorkers       from './components/manager/ManagerWorkers';
import ManagerNotifications from './components/manager/ManagerNotifications';
import ManagerSettings      from './components/manager/ManagerSettings';

const RES_NAV = [
  { key:'dashboard',     icon:'⊞', label:'Dashboard' },
  { key:'report',        icon:'+', label:'Report Issue' },
  { key:'myRequests',    icon:'◫', label:'My Requests' },
  { key:'notifications', icon:'🔔',label:'Notifications' },
  { key:'profile',       icon:'◯', label:'Profile' },
];

const MGR_NAV = [
  { key:'dashboard',     icon:'⊞', label:'Dashboard' },
  { key:'allRequests',   icon:'◫', label:'All Requests' },
  { key:'workers',       icon:'👷', label:'Workers' },
  { key:'notifications', icon:'🔔',label:'Notifications' },
  { key:'settings',      icon:'⚙', label:'Settings' },
];

export default function App() {
  const [role, setRole]   = useState('resident'); // 'resident' | 'manager'
  const [rPage, setRPage] = useState('dashboard');
  const [mPage, setMPage] = useState('dashboard');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [selectedReq, setSelectedReq] = useState(null);

  const page = role === 'resident' ? rPage : mPage;
  const setPage = role === 'resident' ? setRPage : setMPage;
  const nav = role === 'resident' ? RES_NAV : MGR_NAV;

  const pendingCount = requests.filter(r => r.status !== 'Resolved').length;
  const myRequests   = requests.filter(r => r.residentId === 'r1');
  const myPending    = myRequests.filter(r => r.status !== 'Resolved').length;

  const addRequest = (form) => {
    const r = {
      ...form,
      id: Math.floor(2500 + Math.random()*499),
      status:'Pending Review',
      date: new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}),
      residentId:'r1', residentName:'John Doe', residentUnit:'Bldg B · Unit 212',
      workerAssigned:null, maintenanceNote:'', confirmed:false, rating:0,
      timeline:[
        {label:'Submitted',  time: new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'}), done:true},
        {label:'Reviewed',   time:'',done:false},
        {label:'Assigned',   time:'',done:false},
        {label:'In Progress',time:'',done:false},
        {label:'Resolved',   time:'',done:false},
      ],
    };
    setRequests(p=>[r,...p]);
    return r;
  };

  const updateRequest = (id, changes) =>
    setRequests(p => p.map(r => r.id === id ? {...r,...changes} : r));

  const assignWorker = (id, workerId) => {
    const now = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    setRequests(p => p.map(r => {
      if (r.id !== id) return r;
      const tl = r.timeline.map(t =>
        t.label === 'Reviewed'    ? {...t, time: now, done:true} :
        t.label === 'Assigned'    ? {...t, time: now, done:true} :
        t.label === 'In Progress' ? {...t, time: now, done:true} : t
      );
      return {...r, workerAssigned:workerId, status:'In Progress', timeline:tl};
    }));
  };

  const resolveRequest = (id, note) => {
    const now = new Date().toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
    setRequests(p => p.map(r => {
      if (r.id !== id) return r;
      const tl = r.timeline.map(t =>
        t.label === 'Resolved' ? {...t, time: now, done:true} : t
      );
      return {...r, status:'Resolved', maintenanceNote:note, timeline:tl};
    }));
  };

  const goTo = (p) => { setPage(p); setSelectedReq(null); };
  const openReq = (req) => { setSelectedReq(req); setPage(role==='resident'?'myRequests':'allRequests'); };

  const props = {
    requests, myRequests, workers: WORKERS,
    addRequest, updateRequest, assignWorker, resolveRequest,
    selectedReq, setSelectedReq, openReq, navigate: goTo,
  };

  return (
    <div className="app">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="sb-logomark">BS</div>
          <div>
            <div className="sb-logoname">BuildServe</div>
            <div className="sb-logosub">MAINTENANCE PORTAL</div>
          </div>
        </div>

        <div className="sb-role">
          <button className={`sb-role-btn ${role==='resident'?'active':''}`} onClick={()=>{setRole('resident');setRPage('dashboard');}}>
            👤 Resident
          </button>
          <button className={`sb-role-btn ${role==='manager'?'active':''}`} onClick={()=>{setRole('manager');setMPage('dashboard');}}>
            🏢 Manager
          </button>
        </div>

        <nav className="sb-nav">
          <div className="sb-section">Navigation</div>
          {nav.map(n => (
            <button key={n.key} className={`sb-item ${page===n.key?'on':''}`} onClick={()=>goTo(n.key)}>
              <span className="sb-item-icon">{n.icon}</span>
              <span className="sb-item-label">{n.label}</span>
              {n.key==='myRequests'    && myPending>0    && <span className="sb-badge">{myPending}</span>}
              {n.key==='allRequests'   && pendingCount>0 && <span className="sb-badge">{pendingCount}</span>}
              {n.key==='notifications' && <span className="sb-badge">2</span>}
            </button>
          ))}
        </nav>

        <div className="sb-user">
          <div className="sb-user-row" onClick={()=>goTo(role==='resident'?'profile':'settings')}>
            <div className={`sb-avatar ${role}`}>
              {role==='resident'?'JD':'MG'}
            </div>
            <div>
              <div className="sb-uname">{role==='resident'?'John Doe':'Mike Green'}</div>
              <div className="sb-urole">{role==='resident'?'Resident · Bldg B':'Building Manager'}</div>
            </div>
            <span className="sb-uarrow">›</span>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main">
        {role === 'resident' && <>
          {rPage==='dashboard'     && <ResidentDashboard   {...props} />}
          {rPage==='report'        && <ReportFlow           {...props} />}
          {rPage==='myRequests'    && <ResidentRequests     {...props} />}
          {rPage==='notifications' && <ResidentNotifications {...props} />}
          {rPage==='profile'       && <ResidentProfile      {...props} />}
        </>}
        {role === 'manager' && <>
          {mPage==='dashboard'     && <ManagerDashboard     {...props} />}
          {mPage==='allRequests'   && <ManagerRequests      {...props} />}
          {mPage==='workers'       && <ManagerWorkers        {...props} />}
          {mPage==='notifications' && <ManagerNotifications  {...props} />}
          {mPage==='settings'      && <ManagerSettings       {...props} />}
        </>}
      </div>
    </div>
  );
}
