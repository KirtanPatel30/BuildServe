import React, { useState } from 'react';
import './ResidentOther.css';

export function ResidentNotifications({ navigate }) {
  const [items, setItems] = useState([
    {id:1,icon:'✓', type:'green', title:'Request #2471 In Progress',     body:'Mike Williams has been assigned. Estimated arrival 12:30–2:30 PM today.',   time:'5h ago', unread:true},
    {id:2,icon:'⚠', type:'amber', title:'Community Alert',               body:'2 residents in your building recently reported plumbing issues. Management notified.', time:'1d ago', unread:true},
    {id:3,icon:'◎', type:'blue',  title:'Request #2471 Status Updated',  body:'Your plumbing request status changed from Pending Review to In Progress.',  time:'6h ago', unread:false},
    {id:4,icon:'✓', type:'green', title:'Request #2468 Resolved',        body:'Faucet drip issue has been resolved. Please confirm if the issue is fixed.',  time:'18d ago',unread:false},
    {id:5,icon:'＋', type:'orange',title:'Request #2452 Received',       body:'Your HVAC / Heating request has been received and is pending review.',        time:'15d ago',unread:false},
  ]);
  const unread = items.filter(i=>i.unread).length;

  return (<>
    <div className="topbar">
      <div className="tb-title">Notifications</div>
      {unread>0&&<button className="btn btn-ghost btn-sm" onClick={()=>setItems(p=>p.map(i=>({...i,unread:false})))}>Mark all read</button>}
      <button className="tb-cta" onClick={()=>navigate('report')}>+ Report Issue</button>
    </div>
    <div className="page">
      <div className="other-wrap">
        {unread>0&&<div className="other-unread-banner a0">🔔 You have <strong>{unread} unread</strong> notification{unread>1?'s':''}</div>}
        <div className="card other-notif-list a1">
          {items.map(n=>(
            <div key={n.id} className={`other-notif-row ${n.unread?'unread':''}`}>
              <div className={`other-notif-icon type-${n.type}`}>{n.icon}</div>
              <div className="other-notif-body">
                <div className="other-notif-title-row">
                  <span className="other-notif-title">{n.title}</span>
                  <span className="text-mono text-xs text-muted">{n.time}</span>
                </div>
                <div className="other-notif-text">{n.body}</div>
              </div>
              {n.unread&&<div className="other-unread-dot"/>}
              <button className="btn btn-ghost" style={{padding:'4px 8px',fontSize:12}} onClick={()=>setItems(p=>p.filter(i=>i.id!==n.id))}>✕</button>
            </div>
          ))}
          {items.length===0&&<div className="other-empty">🔔<div style={{marginTop:10}}>All caught up!</div></div>}
        </div>
      </div>
    </div>
  </>);
}

export default ResidentNotifications;

export function ResidentProfile() {
  const [toggles, setToggles] = useState({push:true,email:false,updates:true});
  const tog = k => setToggles(t=>({...t,[k]:!t[k]}));

  return (<>
    <div className="topbar"><div className="tb-title">Profile & Settings</div></div>
    <div className="page">
      <div className="other-wrap">
        {/* HERO */}
        <div className="card profile-hero a0">
          <div className="profile-av resident">JD</div>
          <div className="profile-info">
            <div className="profile-name">John Doe</div>
            <div className="profile-tags">
              <span className="profile-tag">Building B</span>
              <span className="profile-tag">Unit 212</span>
              <span className="profile-tag profile-tag-green">Active Resident</span>
            </div>
            <div className="text-xs text-muted" style={{marginTop:4}}>Member since January 2024</div>
          </div>
          <button className="btn btn-secondary btn-sm">Edit Profile</button>
        </div>

        {/* STATS */}
        <div className="profile-stats a1">
          {[{val:'5',label:'Total',color:'var(--orange)'},{val:'2',label:'Active',color:'var(--blue)'},{val:'3',label:'Resolved',color:'var(--green)'},{val:'4.8★',label:'Avg Rating',color:'var(--amber)'}].map((s,i)=>(
            <div key={i} className="card profile-stat"><div className="profile-stat-val" style={{color:s.color}}>{s.val}</div><div className="profile-stat-label">{s.label}</div></div>
          ))}
        </div>

        <div className="profile-2col">
          <div className="a2">
            <div className="other-section-label">Account Information</div>
            <div className="card" style={{overflow:'hidden'}}>
              {[{icon:'🏢',label:'Building',val:'Building B'},{icon:'🚪',label:'Unit',val:'Unit 212'},{icon:'📧',label:'Email',val:'john.doe@email.com'},{icon:'📱',label:'Phone',val:'+1 (555) 000-0000'},{icon:'📅',label:'Move-in Date',val:'January 15, 2024'}].map((r,i)=>(
                <div key={i} className="profile-row">
                  <span className="profile-row-icon">{r.icon}</span>
                  <div><div className="profile-row-label">{r.label}</div><div className="profile-row-val">{r.val}</div></div>
                  <span className="profile-row-arrow ml-auto">›</span>
                </div>
              ))}
            </div>
          </div>
          <div className="a3">
            <div className="other-section-label">Preferences</div>
            <div className="card" style={{overflow:'hidden'}}>
              {[{k:'push',icon:'🔔',label:'Push Notifications',desc:'Status update alerts'},{k:'email',icon:'📩',label:'Email Updates',desc:'Receive updates via email'},{k:'updates',icon:'🏢',label:'Building Alerts',desc:'Community-wide notices'}].map(t=>(
                <div key={t.k} className="profile-row">
                  <span className="profile-row-icon">{t.icon}</span>
                  <div><div className="profile-row-label">{t.label}</div><div className="profile-row-desc">{t.desc}</div></div>
                  <button className={`profile-toggle ${toggles[t.k]?'on':''}`} onClick={()=>tog(t.k)} style={{marginLeft:'auto'}}>
                    <div className="profile-toggle-thumb"/>
                  </button>
                </div>
              ))}
            </div>
            <div className="other-section-label" style={{marginTop:18}}>Support</div>
            <div className="card" style={{overflow:'hidden'}}>
              {['❓ Help & FAQ','💬 Contact Support','📄 Terms of Service','🔒 Privacy Policy'].map((item,i)=>(
                <div key={i} className="profile-row profile-row-link"><span className="profile-row-icon">{item.slice(0,2)}</span><span className="profile-row-label">{item.slice(3)}</span><span className="profile-row-arrow ml-auto">›</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-shallow-note a4">ℹ Profile editing is a placeholder — not yet implemented in this prototype.</div>
      </div>
    </div>
  </>);
}
