import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://backend-x2dj.onrender.com';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [forgotStep, setForgotStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOtp, setForgotOtp] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const navigate = useNavigate();
  const googleBtnRef = useRef(null);
  const [googleBtnKey, setGoogleBtnKey] = useState(0);

  const clearUserStorage = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('isLoggedIn');
  };

  // Google OAuth callback
  const handleGoogleResponse = useCallback(async (response) => {
    setLoading(true);
    setMessage('');
    clearUserStorage(); // Clear previous user data before login
    try {
      const res = await fetch(`${API_BASE_URL}/api/google-auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: response.credential }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Google login failed');
      localStorage.setItem('isLoggedIn', 'true');
      if (data.token) localStorage.setItem('jwt', data.token);
      // Always fetch user info from /api/me if JWT is present
      const jwt = data.token || localStorage.getItem('jwt');
      if (jwt) {
        const userRes = await fetch(`${API_BASE_URL}/api/me`, {
          headers: { 'Authorization': `Bearer ${jwt}` },
        });
        if (userRes.ok) {
          const user = await userRes.json();
          if (user && user.email) {
            localStorage.setItem('userName', user.name || '');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userAvatar', user.avatar || '');
          }
        }
      }
      setMessage('Login successful!');
      setTimeout(() => navigate('/image-upload'), 1000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Render Google button
  useEffect(() => {
    function renderGoogleBtn() {
      if (window.google && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse,
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'outline',
          size: 'large',
          width: 260,
        });
      }
    }
    if (!window.google && !document.getElementById('google-oauth-script')) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.id = 'google-oauth-script';
      script.onload = renderGoogleBtn;
      document.body.appendChild(script);
    } else {
      renderGoogleBtn();
    }
  }, [handleGoogleResponse, googleBtnKey]);

  // Force Google button re-render on form switch
  useEffect(() => { setGoogleBtnKey(k => k + 1); }, [isLogin]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    clearUserStorage();
    const url = isLogin ? `${API_BASE_URL}/api/login` : `${API_BASE_URL}/api/signup`;
    const payload = isLogin
      ? { email: form.email, password: form.password }
      : { name: form.name, email: form.email, password: form.password };
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error');
      setMessage(data.message || (isLogin ? 'Login successful!' : 'Signup successful!'));
      if (data.token) localStorage.setItem('jwt', data.token);
      localStorage.setItem('isLoggedIn', 'true');
      const jwt = data.token || localStorage.getItem('jwt');
      if (jwt) {
        const userRes = await fetch(`${API_BASE_URL}/api/me`, {
          headers: { 'Authorization': `Bearer ${jwt}` },
        });
        if (userRes.ok) {
          const user = await userRes.json();
          if (user && user.email) {
            localStorage.setItem('userName', user.name || '');
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('userAvatar', user.avatar || '');
          }
        } else {
          localStorage.setItem('userName', data.name || '');
          localStorage.setItem('userEmail', form.email);
        }
      } else {
        localStorage.setItem('userName', data.name || '');
        localStorage.setItem('userEmail', form.email);
      }
      setTimeout(() => navigate('/image-upload'), 1000);
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  // OTP-based forgot password flow
  if (showForgot) {
    return (
      <div className="auth-container">
        <div className="auth-box">
          <h2>Reset Password</h2>
          {forgotStep === 1 && (
            <form onSubmit={async e => {
              e.preventDefault();
              setForgotLoading(true);
              setForgotMsg('');
              try {
                const res = await fetch(`${API_BASE_URL}/api/forgot-password`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: forgotEmail }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Error');
                setForgotMsg('OTP sent to your email.');
                setForgotStep(2);
              } catch (err) {
                setForgotMsg(err.message);
              } finally {
                setForgotLoading(false);
              }
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              <button type="submit" className="cta-btn" disabled={forgotLoading}>
                {forgotLoading ? 'Sending...' : 'Send OTP for Verification'}
              </button>
            </form>
          )}
          {forgotStep === 2 && (
            <form onSubmit={async e => {
              e.preventDefault();
              setForgotLoading(true);
              setForgotMsg('');
              try {
                const res = await fetch(`${API_BASE_URL}/api/verify-otp`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: forgotEmail, otp: forgotOtp }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Invalid or expired OTP');
                setForgotMsg('OTP verified! Please enter your new password.');
                setForgotStep(3);
              } catch (err) {
                setForgotMsg(err.message);
              } finally {
                setForgotLoading(false);
              }
            }}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={forgotOtp}
                onChange={e => setForgotOtp(e.target.value)}
                required
                maxLength={6}
              />
              <button type="submit" className="cta-btn" disabled={forgotLoading}>
                {forgotLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}
          {forgotStep === 3 && (
            <form onSubmit={async e => {
              e.preventDefault();
              setForgotLoading(true);
              setForgotMsg('');
              try {
                const res = await fetch(`${API_BASE_URL}/api/reset-password`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email: forgotEmail, otp: forgotOtp, newPassword: forgotNewPassword }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || 'Error');
                setForgotMsg('Password reset successful! You can now log in.');
                setTimeout(() => {
                  setShowForgot(false);
                  setForgotStep(1);
                  setForgotEmail('');
                  setForgotOtp('');
                  setForgotNewPassword('');
                  setForgotMsg('');
                }, 2000);
              } catch (err) {
                setForgotMsg(err.message);
              } finally {
                setForgotLoading(false);
              }
            }}>
              <input
                type="password"
                placeholder="New password"
                value={forgotNewPassword}
                onChange={e => setForgotNewPassword(e.target.value)}
                required
              />
              <button type="submit" className="cta-btn" disabled={forgotLoading}>
                {forgotLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}
          {forgotMsg && <div className="auth-message">{forgotMsg}</div>}
          <button
            type="button"
            className="btn-link"
            onClick={() => {
              setShowForgot(false);
              setForgotStep(1);
              setForgotEmail('');
              setForgotOtp('');
              setForgotNewPassword('');
              setForgotMsg('');
              setGoogleBtnKey(k => k + 1);
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="auth-btn-group">
            <button type="submit" className="cta-btn" disabled={loading}>
              {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : isLogin ? 'Login' : 'Sign Up'}
            </button>
            <div className="auth-or-separator">or</div>
            <button
              type="button"
              className="google-btn"
              onClick={() => window.location.href = `${API_BASE_URL}/api/auth/google`}
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{width:22,marginRight:8,verticalAlign:'middle'}} />
              Sign in with Google
            </button>
            {isLogin && (
              <button
                type="button"
                className="btn-link forgot-btn"
                onClick={() => { setShowForgot(true); setForgotMsg(''); setMessage(''); }}
              >
                Forgot Password?
              </button>
            )}
            <button
              type="button"
              className="btn-link toggle-btn"
              onClick={() => setIsLogin(l => !l)}
            >
              {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Login'}
            </button>
          </div>
        </form>
        {message && <div className="auth-message">{message}</div>}
      </div>
    </div>
  );
}
