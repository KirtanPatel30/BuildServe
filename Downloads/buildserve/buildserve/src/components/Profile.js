import React, { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [toggles, setToggles] = useState({ push: true, email: false, dark: false });
  const toggle = k => setToggles(t => ({ ...t, [k]: !t[k] }));

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Profile & Settings</div>
      </div>

      <div className="page-scroll">
        <div className="profile-container">

          {/* HERO */}
          <div className="profile-hero card anim-0">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">JD</div>
              <div className="profile-avatar-status"></div>
            </div>
            <div className="profile-info">
              <div className="profile-name">John Doe</div>
              <div className="profile-meta-row">
                <span className="profile-meta-tag">Building A</span>
                <span className="profile-meta-tag">Unit 212</span>
                <span className="profile-meta-tag profile-meta-tag--active">Active Resident</span>
              </div>
              <div className="profile-since">Member since January 2024</div>
            </div>
            <button className="btn-outline profile-edit-btn">Edit Profile</button>
          </div>

          {/* STATS */}
          <div className="profile-stats-row anim-1">
            {[
              { val:'3', label:'Total Requests', color:'var(--fire)' },
              { val:'1', label:'In Progress',   color:'var(--sky)' },
              { val:'2', label:'Resolved',       color:'var(--emerald)' },
              { val:'4.8', label:'Avg. Rating',  color:'var(--amber)' },
            ].map((s,i) => (
              <div key={i} className="profile-stat-card card">
                <div className="profile-stat-val" style={{color:s.color}}>{s.val}</div>
                <div className="profile-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="profile-two-col">
            {/* ACCOUNT INFO */}
            <div className="anim-2">
              <div className="profile-section-title">Account Information</div>
              <div className="card profile-info-card">
                {[
                  { icon:'🏢', label:'Building',    value:'Building A' },
                  { icon:'🚪', label:'Unit',         value:'Unit 212' },
                  { icon:'📧', label:'Email',         value:'john.doe@email.com' },
                  { icon:'📱', label:'Phone',         value:'+1 (555) 000-0000' },
                  { icon:'📅', label:'Move-in Date', value:'January 15, 2024' },
                ].map((item, i) => (
                  <div key={i} className="profile-info-row">
                    <span className="profile-info-icon">{item.icon}</span>
                    <div className="profile-info-content">
                      <div className="profile-info-label">{item.label}</div>
                      <div className="profile-info-val">{item.value}</div>
                    </div>
                    <span className="profile-info-edit">›</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PREFERENCES */}
            <div className="anim-3">
              <div className="profile-section-title">Preferences</div>
              <div className="card profile-prefs-card">
                {[
                  { key:'push',  icon:'🔔', label:'Push Notifications', desc:'Get notified on status updates' },
                  { key:'email', icon:'📩', label:'Email Updates',       desc:'Receive updates via email' },
                  { key:'dark',  icon:'🌙', label:'Dark Mode',           desc:'Switch to dark interface' },
                ].map(item => (
                  <div key={item.key} className="profile-pref-row">
                    <div className="profile-pref-icon-wrap">{item.icon}</div>
                    <div className="profile-pref-text">
                      <div className="profile-pref-label">{item.label}</div>
                      <div className="profile-pref-desc">{item.desc}</div>
                    </div>
                    <button
                      className={`profile-toggle ${toggles[item.key] ? 'profile-toggle--on' : ''}`}
                      onClick={() => toggle(item.key)}
                    >
                      <div className="profile-toggle-thumb"></div>
                    </button>
                  </div>
                ))}
              </div>

              <div className="profile-section-title" style={{marginTop:20}}>Support</div>
              <div className="card profile-prefs-card">
                {[
                  { icon:'❓', label:'Help & FAQ' },
                  { icon:'💬', label:'Contact Support' },
                  { icon:'📄', label:'Terms of Service' },
                  { icon:'🔒', label:'Privacy Policy' },
                ].map((item, i) => (
                  <div key={i} className="profile-pref-row profile-pref-row--link">
                    <div className="profile-pref-icon-wrap">{item.icon}</div>
                    <div className="profile-pref-label">{item.label}</div>
                    <span style={{color:'var(--slate-300)',fontSize:18}}>›</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="profile-shallow-note anim-4">
            ℹ Profile editing is not implemented — this is a placeholder screen for the UI class prototype.
          </div>

          <div style={{height:32}}></div>
        </div>
      </div>
    </>
  );
}
