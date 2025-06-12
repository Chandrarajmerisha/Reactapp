import React from 'react';
import './Home.css';

function Contact() {
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
        <h1>Contact Us</h1>
        <p>
          Email: contact@psoriasisai.org
          <br />
          Address: NIT Raipur, G.E. Road, Raipur, Chhattisgarh, India
        </p>
      </section>
    </div>
  );
}

export default Contact;