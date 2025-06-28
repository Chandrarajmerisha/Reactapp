import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
  const [name, setName] = useState(localStorage.getItem('userName') || 'User');
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || 'Not available');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    setMessage('Profile updated (frontend only). Connect to backend for full functionality.');
    setTimeout(() => navigate('/profile'), 1200);
  };

  return (
    <div className="user-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400, margin: '0 auto' }}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="cta-btn" onClick={() => navigate(-1)}>Back</button>
          <button type="submit" className="cta-btn">Save</button>
        </div>
      </form>
      {message && <div style={{ marginTop: '1rem', color: '#1b7e3c', fontWeight: 500 }}>{message}</div>}
    </div>
  );
}
