import React, { useState } from 'react';
import './App.css';
import Dashboard   from './components/Dashboard';
import ReportFlow  from './components/ReportFlow';
import MyRequests  from './components/MyRequests';
import Notifications from './components/Notifications';
import Profile     from './components/Profile';

const INITIAL_REQUESTS = [
  {
    id: 2468, type: 'Plumbing', location: 'Building A – Unit 105 – Bathroom',
    description: 'Faucet dripping constantly even when fully closed.',
    priority: 'Normal', status: 'Resolved', date: 'Mar 28, 2025',
    maintenanceNote: 'Replaced washer and O-ring. Faucet fully sealed.', confirmed: false,
  },
  {
    id: 2452, type: 'HVAC / Heating', location: 'Building A – Unit 105 – Living Room',
    description: 'Heater making loud banging noise on startup every morning.',
    priority: 'Urgent', status: 'In Progress', date: 'Apr 1, 2025',
    maintenanceNote: '', confirmed: false,
  },
  {
    id: 2391, type: 'Electrical', location: 'Building A – Unit 105 – Kitchen',
    description: 'Outlet near sink keeps tripping the breaker.',
    priority: 'Urgent', status: 'Resolved', date: 'Mar 15, 2025',
    maintenanceNote: 'GFCI outlet replaced. Breaker tested and functional.', confirmed: true,
  },
];

const NAV = [
  { key: 'dashboard',     icon: '⊞',  label: 'Dashboard' },
  { key: 'report',        icon: '+',  label: 'Report Issue' },
  { key: 'myRequests',    icon: '◫',  label: 'My Requests' },
  { key: 'notifications', icon: '◉',  label: 'Notifications' },
  { key: 'profile',       icon: '◯',  label: 'Profile' },
];

export default function App() {
  const [page, setPage]       = useState('dashboard');
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [selected, setSelected] = useState(null);

  const pendingCount = requests.filter(r => r.status !== 'Resolved').length;

  const addRequest = (req) => {
    const newReq = {
      ...req,
      id: Math.floor(2500 + Math.random() * 499),
      status: 'Pending Review',
      date: new Date().toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
      maintenanceNote: '',
      confirmed: false,
    };
    setRequests(prev => [newReq, ...prev]);
    return newReq;
  };

  const confirmResolved = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, confirmed: true } : r));
  };

  const reopenRequest = (id) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'In Progress', confirmed: false } : r));
  };

  const goTo = (p) => { setPage(p); setSelected(null); };

  const openRequest = (req) => { setSelected(req); setPage('myRequests'); };

  return (
    <div className="app-layout">
      {/* ── SIDEBAR ── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">BS</div>
          <div>
            <div className="logo-text">BuildServe</div>
            <div className="logo-sub">MAINTENANCE PORTAL</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Main</div>
          {NAV.map(n => (
            <button
              key={n.key}
              className={`nav-item ${page === n.key ? 'active' : ''}`}
              onClick={() => goTo(n.key)}
            >
              <span className="nav-icon">{n.icon}</span>
              <span className="nav-label">{n.label}</span>
              {n.key === 'myRequests' && pendingCount > 0 && (
                <span className="nav-badge">{pendingCount}</span>
              )}
              {n.key === 'notifications' && (
                <span className="nav-badge">2</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user" onClick={() => goTo('profile')}>
            <div className="user-avatar">JD</div>
            <div>
              <div className="user-name">John Doe</div>
              <div className="user-unit">Bldg A · Unit 212</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="main-content">
        {page === 'dashboard'     && <Dashboard     requests={requests} navigate={goTo} openRequest={openRequest} />}
        {page === 'report'        && <ReportFlow     navigate={goTo} addRequest={addRequest} />}
        {page === 'myRequests'    && <MyRequests     requests={requests} selected={selected} setSelected={setSelected} confirmResolved={confirmResolved} reopenRequest={reopenRequest} navigate={goTo} />}
        {page === 'notifications' && <Notifications  navigate={goTo} />}
        {page === 'profile'       && <Profile />}
      </div>
    </div>
  );
}
