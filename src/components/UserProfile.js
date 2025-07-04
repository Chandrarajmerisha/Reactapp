import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-x2dj.onrender.com';

export default function UserProfile() {
  const [user, setUser] = useState({
    name: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
    avatar: localStorage.getItem('userAvatar') || '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Always try to fetch user info from backend on mount
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      fetch(`${API_BASE_URL}/api/me`, {
        headers: { 'Authorization': `Bearer ${jwt}` },
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch user info');
          return res.json();
        })
        .then(data => {
          if (data && data.email) {
            setUser({
              name: data.name || '',
              email: data.email,
              avatar: data.avatar || '',
            });
            localStorage.setItem('userName', data.name || '');
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userAvatar', data.avatar || '');
            setError('');
          } else {
            setError('User info not available.');
          }
          setLoading(false);
        })
        .catch(() => {
          setError('Could not load user info. Please log in again.');
          setLoading(false);
        });
    } else {
      setError('No authentication token found. Please log in.');
      setLoading(false);
    }
  }, []); // Only on mount

  const handleLogout = async () => {
    const jwt = localStorage.getItem('jwt');
    // Optionally call backend logout
    if (jwt) {
      try {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${jwt}` },
        });
      } catch (e) { /* ignore */ }
    }
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('jwt');
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="user-profile-container">
      <div className="profile-photo-wrapper">
        <img
          className="profile-photo"
          src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=38b2ac&color=fff&size=128&rounded=true`}
          alt="Profile"
        />
      </div>
      <h2>User Profile</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{color:'red',marginBottom:'1rem'}}>{error}</div>
      ) : null}
      <p><strong>Name:</strong> {user.name || 'User'}</p>
      <p><strong>Email:</strong> {user.email || 'Not Available'}</p>
      <button className="cta-btn" onClick={handleLogout}>Logout</button>
      <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <button className="cta-btn" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        <button className="cta-btn" onClick={() => navigate('/change-password')}>Change Password</button>
        <button className="cta-btn" onClick={() => navigate('/account-settings')}>Account Settings</button>
      </div>
    </div>
  );
}
