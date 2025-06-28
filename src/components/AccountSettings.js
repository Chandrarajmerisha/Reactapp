import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AccountSettings() {
  const [message, setMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    // TODO: Connect to backend
    setMessage('Delete account requested (frontend only). Connect to backend for full functionality.');
    setShowDeleteConfirm(false);
    setTimeout(() => navigate('/'), 1200);
  };

  return (
    <div className="user-profile-container">
      <button className="cta-btn" style={{ marginBottom: '1rem', width: 'fit-content' }} onClick={() => navigate(-1)}>Back</button>
      <h2>Account Settings</h2>
      <button className="cta-btn" style={{ color: '#d32f2f', borderColor: '#d32f2f' }} onClick={() => setShowDeleteConfirm(true)}>Delete Account</button>
      {message && <div style={{ marginTop: '1rem', color: '#1b7e3c', fontWeight: 500 }}>{message}</div>}
      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Delete Account</h3>
            <p>Are you sure you want to delete your account? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button className="cta-btn" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
              <button className="cta-btn" style={{ color: '#d32f2f', borderColor: '#d32f2f' }} onClick={handleDeleteAccount}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
