import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Home.css';

function Home() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState(null);

  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  return (
    <div className="home">
      <header className="navbar">
        <div className="navbar-brand">
          <svg className="navbar-logo" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2v6h6v4h-6v6H8v-6H2V8h6V2h4z" />
          </svg>
          <span>PsoriasisAI</span>
        </div>
        <button
          className="hamburger"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                Home
              </NavLink>
            </li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/privacy">Privacy Policy</NavLink></li>
          </ul>
        </nav>
      </header>
      <section className="hero">
        <h1>PsoriasisAI: Precision Skin Analysis</h1>
        <p>
          Upload a skin image to explore AI-powered psoriasis analysis by NIT Raipur.
        </p>
        <input
          type="file"
          accept="image/*"
          capture="environment"
          className="upload-input"
          onChange={handleImageUpload}
        />
        {image && (
          <div className="image-preview">
            <img src={image} alt="Uploaded skin for analysis" />
          </div>
        )}
        <NavLink to="/about" className="cta-button">
          Learn More
        </NavLink>
      </section>
    </div>
  );
}

export default Home;