import React, { useState } from 'react';
import './ReportFlow.css';

const ISSUE_TYPES = [
  { key:'Plumbing',        icon:'💧', desc:'Leaks, clogs, water damage', color:'#2563eb' },
  { key:'Electrical',      icon:'⚡', desc:'Power, outlets, wiring',      color:'#d97706' },
  { key:'HVAC / Heating',  icon:'🌡️', desc:'Heat, AC, ventilation',       color:'#e8450a' },
  { key:'Doors / Windows', icon:'🚪', desc:'Locks, glass, frames',         color:'#7c3aed' },
  { key:'Safety Concern',  icon:'🛡️', desc:'Fire, security, hazards',      color:'#e11d48' },
  { key:'General / Other', icon:'🔧', desc:'Other maintenance needs',      color:'#059669' },
];

const PRIORITIES = [
  { key:'Low',    icon:'▽', desc:'Non-urgent, schedule at convenience', color:'#6b7a99' },
  { key:'Normal', icon:'◇', desc:'Needs attention within a few days',   color:'#2563eb' },
  { key:'Urgent', icon:'▲', desc:'Water, safety or immediate hazard',   color:'#e8450a' },
];

export default function ReportFlow({ navigate, addRequest }) {
  const [step, setStep] = useState(1); // 1=type, 2=details, 3=confirm
  const [form, setForm] = useState({ type:'', location:'', description:'', priority:'Normal', photo:false });
  const [submitted, setSubmitted] = useState(null);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const req = addRequest(form);
    setSubmitted(req);
    setStep(4);
  };

  return (
    <>
      <div className="topbar">
        <button className="btn-ghost" onClick={() => step > 1 && step < 4 ? setStep(s=>s-1) : navigate('dashboard')}>
          ← {step > 1 && step < 4 ? 'Back' : 'Dashboard'}
        </button>
        <div className="topbar-title">Report an Issue</div>
        {step < 4 && (
          <div className="rf-steps">
            {['Issue Type','Details','Review'].map((s,i) => (
              <div key={i} className={`rf-step ${step === i+1 ? 'rf-step--active' : step > i+1 ? 'rf-step--done' : ''}`}>
                <div className="rf-step-dot">{step > i+1 ? '✓' : i+1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{width:160}}></div>
      </div>

      <div className="page-scroll">
        <div className="rf-container">

          {/* STEP 1 — TYPE */}
          {step === 1 && (
            <div className="rf-panel anim-0">
              <div className="rf-panel-header">
                <h2 className="rf-panel-title">What type of issue is this?</h2>
                <p className="rf-panel-sub">Select the category that best describes the problem in your unit.</p>
              </div>
              <div className="rf-type-grid">
                {ISSUE_TYPES.map(t => (
                  <button
                    key={t.key}
                    className={`rf-type-card ${form.type === t.key ? 'rf-type-card--sel' : ''}`}
                    style={{'--tc': t.color}}
                    onClick={() => update('type', t.key)}
                  >
                    <div className="rf-type-icon-wrap">
                      <span className="rf-type-emoji">{t.icon}</span>
                    </div>
                    <div className="rf-type-name">{t.key}</div>
                    <div className="rf-type-desc">{t.desc}</div>
                    {form.type === t.key && <div className="rf-type-check">✓</div>}
                  </button>
                ))}
              </div>
              <div className="rf-footer">
                <button className="btn-fire" disabled={!form.type} onClick={() => setStep(2)}>
                  Continue → {form.type && <span className="rf-chosen">({form.type})</span>}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — DETAILS */}
          {step === 2 && (
            <div className="rf-panel anim-0">
              <div className="rf-panel-header">
                <div className="rf-breadcrumb">
                  <span className="rf-breadcrumb-type">{form.type}</span>
                  <button className="btn-ghost" style={{fontSize:12,padding:'4px 8px'}} onClick={() => setStep(1)}>Change</button>
                </div>
                <h2 className="rf-panel-title">Tell us about the problem</h2>
                <p className="rf-panel-sub">The more detail you provide, the faster our team can fix it.</p>
              </div>

              <div className="rf-form">
                <div className="rf-form-row">
                  <div className="field-wrap">
                    <label className="field-label">Location *</label>
                    <input className="field-input" placeholder="e.g. Building A – Unit 212 – Kitchen"
                      value={form.location} onChange={e => update('location', e.target.value)} />
                  </div>
                </div>
                <div className="rf-form-row">
                  <div className="field-wrap">
                    <label className="field-label">Description *</label>
                    <textarea className="field-input" rows={4}
                      placeholder="Describe the issue in detail. When did it start? How severe is it?"
                      value={form.description} onChange={e => update('description', e.target.value)} />
                  </div>
                </div>

                <div className="rf-form-row">
                  <div className="field-wrap">
                    <label className="field-label">Photo Attachment <span className="rf-optional">Optional</span></label>
                    <button
                      className={`rf-photo-btn ${form.photo ? 'rf-photo-btn--added' : ''}`}
                      onClick={() => update('photo', !form.photo)}
                    >
                      <span className="rf-photo-icon">{form.photo ? '✓' : '📷'}</span>
                      <div>
                        <div className="rf-photo-title">{form.photo ? 'Photo attached — IMG_2025.jpg' : 'Upload Photo'}</div>
                        <div className="rf-photo-sub">{form.photo ? 'Tap to remove' : 'Drag & drop or click to browse. Max 10MB.'}</div>
                      </div>
                      {!form.photo && <span className="rf-photo-browse">Browse</span>}
                    </button>
                  </div>
                </div>

                <div className="rf-form-row">
                  <div className="field-wrap">
                    <label className="field-label">Priority Level</label>
                    <div className="rf-priority-row">
                      {PRIORITIES.map(p => (
                        <button key={p.key}
                          className={`rf-priority-btn ${form.priority === p.key ? 'rf-priority-btn--sel' : ''}`}
                          style={{'--pc': p.color}}
                          onClick={() => update('priority', p.key)}
                        >
                          <span className="rf-priority-icon">{p.icon}</span>
                          <span className="rf-priority-name">{p.key}</span>
                          <span className="rf-priority-desc">{p.desc}</span>
                          {form.priority === p.key && <span className="rf-priority-check">✓</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="rf-footer">
                <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                <button className="btn-fire" disabled={!form.location.trim() || !form.description.trim()} onClick={() => setStep(3)}>
                  Review Request →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — REVIEW */}
          {step === 3 && (
            <div className="rf-panel anim-0">
              <div className="rf-panel-header">
                <h2 className="rf-panel-title">Review your request</h2>
                <p className="rf-panel-sub">Confirm the details below before submitting.</p>
              </div>

              <div className="rf-review-card card">
                <div className="rf-review-section">
                  <div className="rf-review-label">Issue Type</div>
                  <div className="rf-review-value rf-review-type">
                    <span>{ISSUE_TYPES.find(t=>t.key===form.type)?.icon}</span>
                    <span>{form.type}</span>
                  </div>
                </div>
                <div className="divider" style={{margin:'0'}}></div>
                <div className="rf-review-section">
                  <div className="rf-review-label">Location</div>
                  <div className="rf-review-value">📍 {form.location}</div>
                </div>
                <div className="divider" style={{margin:'0'}}></div>
                <div className="rf-review-section">
                  <div className="rf-review-label">Description</div>
                  <div className="rf-review-value rf-review-desc">{form.description}</div>
                </div>
                <div className="divider" style={{margin:'0'}}></div>
                <div className="rf-review-section rf-review-row">
                  <div style={{flex:1}}>
                    <div className="rf-review-label">Priority</div>
                    <span className={`chip chip-${form.priority?.toLowerCase()}`}>
                      <span className="chip-dot"></span>{form.priority}
                    </span>
                  </div>
                  <div style={{flex:1}}>
                    <div className="rf-review-label">Photo</div>
                    <div className="rf-review-value">{form.photo ? '✓ Attached' : 'None'}</div>
                  </div>
                  <div style={{flex:1}}>
                    <div className="rf-review-label">Est. Response</div>
                    <div className="rf-review-value">⏱ 24 hours</div>
                  </div>
                </div>
              </div>

              <div className="rf-review-info">
                <span>ℹ</span>
                You will receive a notification when a maintenance worker is assigned to your request.
              </div>

              <div className="rf-footer">
                <button className="btn-outline" onClick={() => setStep(2)}>← Edit</button>
                <button className="btn-fire" onClick={submit}>🚀 Submit Request</button>
              </div>
            </div>
          )}

          {/* STEP 4 — SUCCESS */}
          {step === 4 && submitted && (
            <div className="rf-success anim-0">
              <div className="rf-success-icon-wrap">
                <div className="rf-success-ring rf-success-ring-1"></div>
                <div className="rf-success-ring rf-success-ring-2"></div>
                <div className="rf-success-circle">✓</div>
              </div>
              <h2 className="rf-success-title">Request Submitted!</h2>
              <p className="rf-success-sub">Your maintenance request has been received and is now under review.</p>

              <div className="rf-success-card card">
                <div className="rf-success-id-row">
                  <div>
                    <div className="rf-success-id-label">REQUEST ID</div>
                    <div className="rf-success-id-val">#{submitted.id}</div>
                  </div>
                  <span className="chip chip-pending"><span className="chip-dot"></span>Pending Review</span>
                </div>
                <div className="divider"></div>
                <div className="rf-success-detail-grid">
                  <div><div className="rf-review-label">Type</div><div className="rf-review-value">{submitted.type}</div></div>
                  <div><div className="rf-review-label">Priority</div><span className={`chip chip-${submitted.priority?.toLowerCase()}`}><span className="chip-dot"></span>{submitted.priority}</span></div>
                  <div><div className="rf-review-label">Est. Response</div><div className="rf-review-value">⏱ 24 hours</div></div>
                </div>
              </div>

              <div className="rf-success-actions">
                <button className="btn-fire" onClick={() => navigate('myRequests')}>View My Requests →</button>
                <button className="btn-outline" onClick={() => { setStep(1); setForm({type:'',location:'',description:'',priority:'Normal',photo:false}); setSubmitted(null); }}>
                  Submit Another
                </button>
                <button className="btn-ghost" onClick={() => navigate('dashboard')}>Back to Dashboard</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
