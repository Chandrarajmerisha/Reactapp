// import React from 'react';
// import './Home.css';

// function Privacy() {
//   return (
//     <div className="home">
//       <header className="navbar">
//         <div className="navbar-brand">
//           <svg className="navbar-logo" viewBox="0 0 24 24" fill="#fff">
//             <path d="M12 2v6h6v4h-6v6H8v-6H2V8h6V2h4z" />
//           </svg>
//           <span>PsoriasisAI</span>
//         </div>
//       </header>
//       <section className="hero">
//         <h1>Privacy Policy</h1>
//         <p>
//           PsoriasisAI is committed to protecting your privacy. We collect minimal data to improve our
//           services, and medical data is handled securely. Contact privacy@psoriasisai.org for details.
//         </p>
//       </section>
//     </div>
//   );
// }

// export default Privacy;


import React from 'react';
import './Home.css';

function Privacy() {
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
        <h1>Privacy Policy</h1>
        <p>
          PsoriasisAI protects your privacy, collecting minimal data for service improvement. Medical
          data is handled securely.
        </p>
      </section>
    </div>
  );
}

export default Privacy;