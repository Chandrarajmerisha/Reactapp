import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-x2dj.onrender.com';

export default function OAuthSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('jwt', token);
      localStorage.setItem('isLoggedIn', 'true');
      // Fetch user info from backend using the token
      fetch(`${API_BASE_URL}/api/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(user => {
          if (user && user.email) {
            localStorage.setItem('userName', user.name || '');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userAvatar', user.avatar || '');
          }
          navigate('/image-upload', { replace: true });
        })
        .catch(() => {
          // fallback: just redirect
          navigate('/image-upload', { replace: true });
        });
    } else {
      // Show error if token missing
      alert('Google login failed or was cancelled. Please try again.');
      navigate('/auth', { replace: true });
    }
  }, [location, navigate]);

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Signing you in...</h2>
        <p>Please wait while we complete your Google login.</p>
      </div>
    </div>
  );
}
