import React, { useState } from 'react';
import './Notifications.css';

const NOTIFS = [
  { id:1, icon:'✓',  type:'emerald', title:'Request #2391 Resolved',         body:'Your electrical outlet issue has been resolved. GFCI outlet replaced successfully.', time:'2 days ago', unread:false },
  { id:2, icon:'⚡', type:'sky',     title:'Maintenance Worker Assigned',     body:'Mike W. has been assigned to your HVAC request #2452. Expected arrival: 12:30–2:30 PM.', time:'5 hours ago', unread:true },
  { id:3, icon:'⚠',  type:'amber',  title:'Community Alert',                  body:'2 residents in your building recently reported plumbing issues. Management has been notified.', time:'1 day ago', unread:true },
  { id:4, icon:'◎',  type:'slate',  title:'Request #2452 Status Updated',    body:'Your HVAC / Heating request is now In Progress.', time:'6 hours ago', unread:false },
  { id:5, icon:'＋', type:'fire',   title:'Request #2468 Submitted',          body:'Your plumbing request has been received and is under review.', time:'7 days ago', unread:false },
];

export default function Notifications({ navigate }) {
  const [notifs, setNotifs] = useState(NOTIFS);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, unread: false })));
  const dismiss = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const unreadCount = notifs.filter(n => n.unread).length;

  return (
    <>
      <div className="topbar">
        <div className="topbar-title">Notifications</div>
        {unreadCount > 0 && (
          <button className="btn-ghost" onClick={markAllRead}>Mark all as read</button>
        )}
        <button className="topbar-cta" onClick={() => navigate('report')}>+ Report Issue</button>
      </div>

      <div className="page-scroll">
        <div className="notif-container">

          {unreadCount > 0 && (
            <div className="notif-unread-banner anim-0">
              <span>🔔</span>
              <span>You have <strong>{unreadCount} unread</strong> notification{unreadCount > 1 ? 's' : ''}</span>
            </div>
          )}

          <div className="notif-list anim-1">
            {notifs.map(n => (
              <div key={n.id} className={`notif-row ${n.unread ? 'notif-row--unread' : ''}`}>
                <div className={`notif-icon notif-icon--${n.type}`}>{n.icon}</div>
                <div className="notif-body-wrap">
                  <div className="notif-title-row">
                    <span className="notif-title">{n.title}</span>
                    <span className="notif-time">{n.time}</span>
                  </div>
                  <div className="notif-text">{n.body}</div>
                </div>
                {n.unread && <div className="notif-unread-dot"></div>}
                <button className="notif-dismiss" onClick={() => dismiss(n.id)}>✕</button>
              </div>
            ))}

            {notifs.length === 0 && (
              <div className="notif-empty">
                <div style={{fontSize:48,marginBottom:12}}>🔔</div>
                <div>All caught up! No notifications.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
