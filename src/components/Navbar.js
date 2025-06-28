import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ setFlash }) {
  const [open, setOpen] = useState(false);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    if (setFlash) {
      setFlash('Logout successful.');
      setTimeout(() => setFlash(''), 2500);
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>PsoriasisAI</Link>
      </div>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        <span>{open ? "\u2716" : "\u2630"}</span>
      </button>
      <div className={`navbar-menu${open ? " active" : ""}`} onClick={() => setOpen(false)}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          {!isLoggedIn && <li><Link to="/auth">Login/Sign Up</Link></li>}
          {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
          {isLoggedIn && <li><button className="cta-btn" style={{padding:'0.4rem 1.2rem',fontSize:'1rem'}} onClick={handleLogout}>Logout</button></li>}
        </ul>
      </div>
    </nav>
  );
}
