import React from 'react';
import './Home.css';

function About() {
  return (
    <div className="home">
      <header className="navbar">
        <div className="navbar-brand">
          <svg className="navbar-logo" viewBox="0 0 24 24" fill="#fff">
            <path d="M12 2v6h6v4h-6v6H8v-6H2V8h6V2h4z" />
          </svg>
          <span>PsoriasisAI</span>
        </div>
      </header>
      <section className="hero">
        <h1>About PsoriasisAI</h1>
        <p>
          Developed by NIT Raipur, PsoriasisAI leverages AI to advance dermatological research through
          precise psoriasis lesion segmentation.
        </p>
      </section>
    </div>
  );
}

export default About;