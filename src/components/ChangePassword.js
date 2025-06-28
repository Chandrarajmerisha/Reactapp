import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Connect to backend
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match.');
      return;
    }
    setMessage('Password change requested (frontend only). Connect to backend for full functionality.');
    setTimeout(() => navigate('/profile'), 1200);
  };

  return (
    <div className="user-profile-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 400, margin: '0 auto' }}>
        <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Old Password" required />
        <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New Password" required />
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" required />
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
          <button type="button" className="cta-btn" onClick={() => navigate('/profile')}>Cancel</button>
          <button type="submit" className="cta-btn">Change</button>
        </div>
      </form>
      {message && <div style={{ marginTop: '1rem', color: '#1b7e3c', fontWeight: 500 }}>{message}</div>}
    </div>
  );
}
