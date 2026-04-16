import React, { useState } from 'react';
import '../resident/ResidentOther.css';
import './ManagerOther.css';

export function ManagerNotifications({ navigate }) {
  const [items, setItems] = useState([
    {id:1,icon:'🚨',type:'red',   title:'Urgent: Request #2452 Unassigned 12h', body:'The HVAC heating request from Sara Nguyen (Unit 105) has been waiting 12 hours with no worker assigned.',time:'Now',  unread:true},
    {id:2,icon:'✓', type:'green', title:'Request #2471 In Progress',             body:'Mike Williams has been assigned to the plumbing request from John Doe (Unit 212).',                           time:'5h ago', unread:true},
    {id:3,icon:'◎', type:'blue',  title:'New Request Submitted: #2471',          body:'John Doe (Bldg B, Unit 212) reported an urgent plumbing leak in the kitchen.',                                time:'6h ago', unread:false},
    {id:4,icon:'✓', type:'green', title:'Request #2391 Confirmed Resolved',      body:'Sara Nguyen confirmed that the electrical outlet issue was fixed.',                                           time:'15d ago',unread:false},
    {id:5,icon:'⚠', type:'amber', title:'Community: 2 Plumbing Reports Today',   body:'2 residents in Building B have reported similar plumbing issues. Consider a building-wide inspection.',     time:'1d ago', unread:false},
  ]);
  const unread = items.filter(i=>i.unread).length;

  return (<>
    <div className="topbar">
      <div className="tb-title">Notifications</div>
      {unread>0&&<button className="btn btn-ghost btn-sm" onClick={()=>setItems(p=>p.map(i=>({...i,unread:false})))}>Mark all read</button>}
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
        </div>
      </div>
    </div>
  </>);
}

export default ManagerNotifications;

export function ManagerSettings() {
  const [toggles, setToggles] = useState({urgent:true,newReq:true,resolved:true,community:false});
  const tog = k => setToggles(t=>({...t,[k]:!t[k]}));

  return (<>
    <div className="topbar"><div className="tb-title">Settings</div></div>
    <div className="page">
      <div className="other-wrap">
        {/* MANAGER PROFILE */}
        <div className="card profile-hero a0">
          <div className="profile-av manager">MG</div>
          <div className="profile-info">
            <div className="profile-name">Mike Green</div>
            <div className="profile-tags">
              <span className="profile-tag">Building Manager</span>
              <span className="profile-tag profile-tag-green">Active</span>
            </div>
            <div className="text-xs text-muted" style={{marginTop:4}}>Managing Buildings A, B & C</div>
          </div>
          <button className="btn btn-secondary btn-sm">Edit Profile</button>
        </div>

        {/* BUILDING OVERVIEW */}
        <div className="a1">
          <div className="other-section-label">Buildings Under Management</div>
          <div className="card" style={{overflow:'hidden',marginBottom:20}}>
            {[
              {icon:'🏢',name:'Building A',units:24,note:'12 active residents'},
              {icon:'🏢',name:'Building B',units:18,note:'9 active residents'},
              {icon:'🏢',name:'Building C',units:30,note:'22 active residents'},
            ].map((b,i)=>(
              <div key={i} className="profile-row profile-row-link">
                <span className="profile-row-icon">{b.icon}</span>
                <div>
                  <div className="profile-row-label">{b.name}</div>
                  <div className="profile-row-desc">{b.units} units · {b.note}</div>
                </div>
                <span className="profile-row-arrow ml-auto">›</span>
              </div>
            ))}
          </div>
        </div>

        <div className="profile-2col">
          <div className="a2">
            <div className="other-section-label">Notification Settings</div>
            <div className="card" style={{overflow:'hidden'}}>
              {[
                {k:'urgent', icon:'🚨',label:'Urgent Request Alerts',  desc:'Immediate alert for urgent requests'},
                {k:'newReq', icon:'＋',label:'New Request Alerts',     desc:'Alert when a resident submits a request'},
                {k:'resolved',icon:'✓',label:'Resolution Confirmations',desc:'Alert when resident verifies issue fixed'},
                {k:'community',icon:'⚠',label:'Community Alerts',     desc:'Building-wide pattern notifications'},
              ].map(t=>(
                <div key={t.k} className="profile-row">
                  <span className="profile-row-icon">{t.icon}</span>
                  <div><div className="profile-row-label">{t.label}</div><div className="profile-row-desc">{t.desc}</div></div>
                  <button className={`profile-toggle ${toggles[t.k]?'on':''}`} onClick={()=>tog(t.k)} style={{marginLeft:'auto'}}>
                    <div className="profile-toggle-thumb"/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="a3">
            <div className="other-section-label">System Settings</div>
            <div className="card" style={{overflow:'hidden'}}>
              {[
                {icon:'⏱',label:'Default Response SLA',    val:'24 hours'},
                {icon:'🔔',label:'Escalation After',        val:'48 hours'},
                {icon:'📊',label:'Report Period',           val:'Monthly'},
              ].map((r,i)=>(
                <div key={i} className="profile-row profile-row-link">
                  <span className="profile-row-icon">{r.icon}</span>
                  <div><div className="profile-row-label">{r.label}</div></div>
                  <div className="ml-auto" style={{display:'flex',alignItems:'center',gap:6}}>
                    <span className="text-mono text-xs" style={{color:'var(--navy-600)',fontWeight:600}}>{r.val}</span>
                    <span className="profile-row-arrow">›</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="other-section-label" style={{marginTop:18}}>Data & Reports</div>
            <div className="card" style={{overflow:'hidden'}}>
              {['📥 Export Request History','📊 Generate Monthly Report','🗑 Clear Resolved Requests'].map((item,i)=>(
                <div key={i} className="profile-row profile-row-link">
                  <span className="profile-row-icon">{item.slice(0,2)}</span>
                  <span className="profile-row-label">{item.slice(3)}</span>
                  <span className="profile-row-arrow ml-auto">›</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="profile-shallow-note a4">ℹ Settings editing is a placeholder — not implemented in this prototype.</div>
      </div>
    </div>
  </>);
}
