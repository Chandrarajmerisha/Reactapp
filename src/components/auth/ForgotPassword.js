import React, { useState } from 'react';
import OTPVerify from '../OTPVerify';

const ForgotPassword = ({ onCancel, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Error sending reset link');
      }
      setMessage('OTP sent to your email. Please enter it below.');
      setShowOTP(true);
    } catch (error) {
      setError(error.message || 'Error processing request');
    } finally {
      setIsLoading(false);
    }
  };

  if (showOTP) {
    return <OTPVerify email={email} onSuccess={onSuccess} onCancel={() => setShowOTP(false)} />;
  }

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {message && <div className="success">{message}</div>}
        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary"
        >
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <div className="auth-links">
          <button 
            type="button"
            className="btn-link"
            onClick={onCancel}
          >
            Back to Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;