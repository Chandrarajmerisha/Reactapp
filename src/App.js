import Navbar from './components/Navbar';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './components/Auth';
import ImageUpload from './components/ImageUpload';
import UserProfile from './components/UserProfile';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import EditProfile from './components/EditProfile';
import ChangePassword from './components/ChangePassword';
import AccountSettings from './components/AccountSettings';
import OAuthSuccess from './components/OAuthSuccess';

import { useState, useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState("");
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('hasVisited')) {
      setShowOnboarding(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  const handleImageUploadClick = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/auth'); // Route to login/signup if not logged in
      setFlash("Login to start");
      setTimeout(() => setFlash(""), 2500);
    } else {
      navigate('/image-upload');
    }
  };

  return (
    <div className="app-container">
      <Navbar setFlash={setFlash} />
      {showOnboarding && (
        <div className="onboarding-modal">
          <div className="onboarding-content">
            <h2>👋 Welcome to PsoriasisAI!</h2>
            <p>We're here to help you analyze psoriasis images with AI-powered segmentation.<br /><br />
              <b>How to get started:</b>
              <ul>
                <li>Sign up or log in to your account.</li>
                <li>Click <b>Start</b> to upload an image.</li>
                <li>View your segmentation results and metrics instantly.</li>
                <li>Explore About, Contact, and Privacy Policy for more info.</li>
              </ul>
            </p>
            <button className="cta-btn" onClick={() => setShowOnboarding(false)} style={{marginTop:'1.5rem'}}>Get Started</button>
          </div>
        </div>
      )}
      <main className="main-content">
        {flash && (
          <div className={
            `flash-message${flash.toLowerCase().includes('success') || flash.startsWith('✅') ? ' success' : ''}`
          }>
            <span>{flash}</span>
            <button className="flash-close" onClick={() => setFlash("")} aria-label="Close">&times;</button>
          </div>
        )}
        <Routes>
          <Route path="/" element={
            <section className="hero-section">
              <div className="hero-medical-icon">
                <svg width="64" height="64" fill="none" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <rect width="64" height="64" rx="16" fill="#eaf6fb"/>
                  <path d="M32 18v28M18 32h28" stroke="#21a1f3" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <h1>Welcome to PsoriasisAI</h1>
              <div className="hero-badge">AI-powered • Privacy-focused • Trusted</div>
              <p className="hero-tagline">Your reliable assistant for accurate, secure, and fast psoriasis lesion analysis.</p>
              <p>Your smart assistant for psoriasis detection and information.</p>
              <button className="cta-btn" onClick={handleImageUploadClick}>Start Segmentation</button>
            </section>
          } />
          <Route path="/auth" element={<Auth setFlash={setFlash} />} />
          <Route path="/image-upload" element={<ImageUpload />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/account-settings" element={<AccountSettings />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </main>
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} PsoriasisAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

