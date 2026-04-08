import React, { useState } from 'react';
import './MyRequests.css';

const ICONS = { Plumbing:'💧', Electrical:'⚡', 'HVAC / Heating':'🌡️', 'Doors / Windows':'🚪', 'Safety Concern':'🛡️', 'General / Other':'🔧' };

export default function MyRequests({ requests, selected, setSelected, confirmResolved, reopenRequest, navigate }) {
  const [filter, setFilter] = useState('All');
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const filters = ['All','Pending Review','In Progress','Resolved'];

  const filtered = filter === 'All' ? requests : requests.filter(r => r.status === filter);

  const open = (req) => { setSelected(req); setRating(0); };

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">My Requests</div>
        <div className="topbar-search">
          <span>⌕</span>
          <input placeholder="Search requests…" />
        </div>
        <button className="topbar-cta" onClick={() => navigate('report')}>+ Report Issue</button>
      </div>

      <div className="page-scroll" style={{padding:0, display:'flex', height:'calc(100vh - 64px)'}}>

        {/* LEFT PANEL — LIST */}
        <div className={`mq-list-panel ${selected ? 'mq-list-panel--narrow' : ''}`}>
          {/* FILTER TABS */}
          <div className="mq-filters">
            {filters.map(f => (
              <button key={f} className={`mq-filter-tab ${filter === f ? 'mq-filter-tab--active' : ''}`}
                onClick={() => setFilter(f)}>
                {f}
                <span className="mq-filter-count">
                  {f === 'All' ? requests.length : requests.filter(r=>r.status===f).length}
                </span>
              </button>
            ))}
          </div>

          {/* CARDS */}
          <div className="mq-cards">
            {filtered.length === 0 && (
              <div className="mq-empty">
                <div style={{fontSize:40,marginBottom:12}}>◫</div>
                <div>No requests in this category.</div>
              </div>
            )}
            {filtered.map((req, i) => (
              <div key={req.id}
                className={`mq-card ${selected?.id === req.id ? 'mq-card--active' : ''} anim-${Math.min(i,5)}`}
                onClick={() => open(req)}>
                <div className="mq-card-top">
                  <div className="mq-card-type">
                    <span>{ICONS[req.type]||'🔧'}</span>
                    <span className="mq-card-type-name">{req.type}</span>
                  </div>
                  <span className={`chip chip-${req.status==='Resolved'?'resolved':req.status==='In Progress'?'progress':'pending'}`}>
                    <span className="chip-dot"></span>{req.status}
                  </span>
                </div>
                <div className="mq-card-location">📍 {req.location}</div>
                <div className="mq-card-desc">{req.description}</div>
                <div className="mq-card-footer">
                  <span className={`chip chip-${req.priority?.toLowerCase()}`}>
                    <span className="chip-dot"></span>{req.priority}
                  </span>
                  <span className="mq-card-id">#{req.id}</span>
                  <span className="mq-card-date">{req.date}</span>
                </div>
                {req.status === 'In Progress' && (
                  <div className="mq-progress-bar"><div className="mq-progress-fill"></div></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL — DETAIL */}
        {selected && (
          <div className="mq-detail-panel">
            <div className="mq-detail-header">
              <div>
                <div className="mq-detail-id">Request #{selected.id}</div>
                <div className="mq-detail-date">{selected.date}</div>
              </div>
              <button className="btn-ghost" onClick={() => setSelected(null)}>✕ Close</button>
            </div>

            <div className="mq-detail-scroll">
              {/* STATUS BADGE */}
              <div className="mq-detail-status-row">
                <span className={`chip chip-${selected.status==='Resolved'?'resolved':selected.status==='In Progress'?'progress':'pending'}`} style={{fontSize:13,padding:'6px 14px'}}>
                  <span className="chip-dot"></span>{selected.status}
                </span>
                <span className={`chip chip-${selected.priority?.toLowerCase()}`} style={{fontSize:13,padding:'6px 14px'}}>
                  <span className="chip-dot"></span>{selected.priority}
                </span>
              </div>

              {/* ISSUE DETAILS */}
              <div className="mq-detail-section">
                <div className="mq-detail-section-title">Issue Details</div>
                <div className="mq-detail-card">
                  <div className="mq-detail-row">
                    <span className="mq-detail-row-label">Type</span>
                    <span className="mq-detail-row-val">
                      {ICONS[selected.type]||'🔧'} {selected.type}
                    </span>
                  </div>
                  <div className="mq-detail-row">
                    <span className="mq-detail-row-label">Location</span>
                    <span className="mq-detail-row-val">📍 {selected.location}</span>
                  </div>
                  <div className="mq-detail-row mq-detail-row--desc">
                    <span className="mq-detail-row-label">Description</span>
                    <span className="mq-detail-row-val">{selected.description}</span>
                  </div>
                </div>
              </div>

              {/* MAINTENANCE NOTE (resolved) */}
              {selected.status === 'Resolved' && selected.maintenanceNote && (
                <div className="mq-detail-section">
                  <div className="mq-detail-section-title">Maintenance Note</div>
                  <div className="mq-maintenance-note">
                    <div className="mq-maintenance-worker">🔧 Mike W. — Maintenance Worker</div>
                    <div className="mq-maintenance-text">{selected.maintenanceNote}</div>
                  </div>
                </div>
              )}

              {/* RATING */}
              {selected.status === 'Resolved' && (
                <div className="mq-detail-section">
                  <div className="mq-detail-section-title">Rate the Service</div>
                  <div className="mq-stars-row">
                    {[1,2,3,4,5].map(s => (
                      <button key={s} className={`mq-star ${s <= (hoverStar||rating) ? 'mq-star--on' : ''}`}
                        onMouseEnter={()=>setHoverStar(s)} onMouseLeave={()=>setHoverStar(0)}
                        onClick={()=>setRating(s)}>★</button>
                    ))}
                    {rating > 0 && <span className="mq-rating-label">
                      {['','😞','😕','😐','😊','🤩'][rating]} {['','Very unsatisfied','Unsatisfied','Neutral','Satisfied','Very satisfied!'][rating]}
                    </span>}
                  </div>
                </div>
              )}

              {/* RESOLUTION ACTIONS */}
              {selected.status === 'Resolved' && !selected.confirmed && (
                <div className="mq-detail-section">
                  <div className="mq-detail-section-title">Verify Resolution</div>
                  <div className="mq-verify-hint">
                    <div><span style={{color:'var(--emerald)'}}>●</span> <strong>Confirm Fixed</strong> — closes the request permanently</div>
                    <div><span style={{color:'var(--rose)'}}>●</span> <strong>Still Having Issue</strong> — reopens for follow-up</div>
                  </div>
                  <div className="mq-verify-btns">
                    <button className="btn-emerald" onClick={() => { confirmResolved(selected.id); setSelected(null); }}>
                      ✓ Confirm Fixed
                    </button>
                    <button className="btn-rose" onClick={() => { reopenRequest(selected.id); setSelected(null); }}>
                      ↺ Still Having Issue
                    </button>
                  </div>
                </div>
              )}

              {selected.confirmed && (
                <div className="mq-confirmed-badge">✓ You confirmed this issue was resolved</div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
