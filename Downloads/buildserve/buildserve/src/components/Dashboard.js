import React from 'react';
import './Dashboard.css';

const ISSUE_ICONS = { Plumbing:'💧', Electrical:'⚡', 'HVAC / Heating':'🌡️', 'Doors / Windows':'🚪', 'Safety Concern':'🛡️', 'General / Other':'🔧' };

export default function Dashboard({ requests, navigate, openRequest }) {
  const total    = requests.length;
  const active   = requests.filter(r => r.status !== 'Resolved').length;
  const resolved = requests.filter(r => r.status === 'Resolved').length;
  const urgent   = requests.filter(r => r.priority === 'Urgent' && r.status !== 'Resolved').length;
  const recent   = [...requests].slice(0, 5);

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Dashboard</div>
        <div className="topbar-search">
          <span>⌕</span>
          <input placeholder="Search requests…" />
        </div>
        <button className="topbar-alert-btn">
          🔔
          <span className="topbar-dot"></span>
        </button>
        <button className="topbar-cta" onClick={() => navigate('report')}>
          + Report Issue
        </button>
      </div>

      <div className="page-scroll">

        {/* ALERT BANNER */}
        <div className="db-alert-banner anim-0">
          <div className="db-alert-pulse"></div>
          <span className="db-alert-icon">⚠️</span>
          <div className="db-alert-text">
            <strong>Community Alert:</strong> 2 residents in your building recently reported plumbing issues. Management has been notified.
          </div>
          <button className="btn-ghost db-alert-dismiss">Dismiss ×</button>
        </div>

        {/* STAT CARDS */}
        <div className="db-stats-grid anim-1">
          {[
            { label: 'Total Requests', value: total,    icon: '◫',  color: 'slate', trend: '+1 this week' },
            { label: 'Active',         value: active,   icon: '◎',  color: 'amber', trend: `${urgent} urgent` },
            { label: 'Resolved',       value: resolved, icon: '✓',  color: 'emerald', trend: 'All time' },
            { label: 'Avg. Response',  value: '24h',    icon: '⏱',  color: 'sky',   trend: 'Estimated' },
          ].map((s, i) => (
            <div key={i} className={`db-stat-card db-stat-card--${s.color}`}>
              <div className="db-stat-top">
                <div className="db-stat-label">{s.label}</div>
                <div className={`db-stat-icon-wrap db-stat-icon-wrap--${s.color}`}>{s.icon}</div>
              </div>
              <div className="db-stat-value">{s.value}</div>
              <div className="db-stat-trend">{s.trend}</div>
            </div>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="db-main-grid">

          {/* RECENT REQUESTS TABLE */}
          <div className="card db-table-card anim-2">
            <div className="db-card-header">
              <div className="db-card-title">Recent Requests</div>
              <button className="btn-ghost" onClick={() => navigate('myRequests')}>View all →</button>
            </div>

            <table className="db-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recent.map(req => (
                  <tr key={req.id} className="db-table-row" onClick={() => openRequest(req)}>
                    <td><span className="db-id">#{req.id}</span></td>
                    <td>
                      <div className="db-type-cell">
                        <span>{ISSUE_ICONS[req.type] || '🔧'}</span>
                        <span>{req.type}</span>
                      </div>
                    </td>
                    <td className="db-location">{req.location}</td>
                    <td>
                      <span className={`chip chip-${req.priority?.toLowerCase()}`}>
                        <span className="chip-dot"></span>{req.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`chip chip-${
                        req.status === 'Resolved' ? 'resolved' :
                        req.status === 'In Progress' ? 'progress' : 'pending'
                      }`}>
                        <span className="chip-dot"></span>{req.status}
                      </span>
                    </td>
                    <td className="db-date">{req.date}</td>
                    <td><span className="db-row-arrow">→</span></td>
                  </tr>
                ))}
              </tbody>
            </table>

            {recent.length === 0 && (
              <div className="db-empty">
                <div className="db-empty-icon">◫</div>
                <div>No requests yet.</div>
                <button className="btn-fire" style={{marginTop:12}} onClick={() => navigate('report')}>Report your first issue</button>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="db-right-col">

            {/* QUICK REPORT */}
            <div className="card db-quick-card anim-3" onClick={() => navigate('report')}>
              <div className="db-quick-icon-wrap">
                <span className="db-quick-icon">+</span>
              </div>
              <div className="db-quick-text">
                <div className="db-quick-title">Report New Issue</div>
                <div className="db-quick-sub">Plumbing · Electrical · HVAC · More</div>
              </div>
              <span className="db-quick-arrow">→</span>
            </div>

            {/* STATUS BREAKDOWN */}
            <div className="card db-breakdown-card anim-4">
              <div className="db-card-header">
                <div className="db-card-title">Status Breakdown</div>
              </div>
              <div className="db-breakdown-list">
                {[
                  { label: 'Pending Review', count: requests.filter(r=>r.status==='Pending Review').length, color: 'var(--amber)' },
                  { label: 'In Progress',    count: requests.filter(r=>r.status==='In Progress').length,    color: 'var(--sky)' },
                  { label: 'Resolved',       count: requests.filter(r=>r.status==='Resolved').length,       color: 'var(--emerald)' },
                ].map((item, i) => (
                  <div key={i} className="db-breakdown-item">
                    <div className="db-breakdown-left">
                      <div className="db-breakdown-dot" style={{ background: item.color }}></div>
                      <span className="db-breakdown-label">{item.label}</span>
                    </div>
                    <div className="db-breakdown-right">
                      <span className="db-breakdown-count">{item.count}</span>
                      <div className="db-breakdown-bar-bg">
                        <div className="db-breakdown-bar-fill" style={{ width: `${total > 0 ? (item.count/total)*100 : 0}%`, background: item.color }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="card db-activity-card anim-5">
              <div className="db-card-header">
                <div className="db-card-title">Activity Feed</div>
              </div>
              <div className="db-activity-list">
                {[
                  { icon:'✓', color:'var(--emerald)', text:'Request #2391 marked resolved', time:'2 days ago' },
                  { icon:'⚡', color:'var(--sky)',     text:'Worker assigned to #2452',       time:'5 hours ago' },
                  { icon:'⚠', color:'var(--amber)',   text:'Community plumbing alert issued', time:'1 day ago' },
                  { icon:'＋', color:'var(--fire)',    text:'Request #2468 submitted',         time:'7 days ago' },
                ].map((item, i) => (
                  <div key={i} className="db-activity-item">
                    <div className="db-activity-dot" style={{ background: item.color }}>{item.icon}</div>
                    <div className="db-activity-content">
                      <div className="db-activity-text">{item.text}</div>
                      <div className="db-activity-time">{item.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
