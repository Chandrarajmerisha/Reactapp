// import logo from './logo.svg';
// import { Routes, Route,} from "react-router-dom";
// import './App.css';
// import './Home.css';
// import Home from "./Home.js";


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <h1> Hello </h1>
//         <p>
//          Hello this is a simple React application with routing.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//       {/* Pages */}
//       <Routes>
//         <Route path="/" element={<Home/>} />
//         </Routes>
//     </div>
//   );
// }

// export default App;

// import React, { useState, useEffect } from "react";
// import { Routes, Route, Link, useLocation } from "react-router-dom";
// import Home from "./Home";
// import About from "./About";
// import Services from "./Service";
// import Blogs from "./Blogs";
// import Contact from "./Contact";
// import Footer from "./Footer";

// function App() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const location = useLocation();

//   // Close menu and scroll to top on route change
//   useEffect(() => {
//     setMenuOpen(false);
//     window.scrollTo(0, 0);
//   }, [location.pathname]);

//   return (
//     <div className="landing">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="navbar-container">
//           {/* Logo */}
//           <div className="logo">
//             <Link to="/">
//               <img src="/Images/fevi12.jpg" alt="Logo" style={{ height: "50px" }} />
//             </Link>
//           </div>

//           {/* Mobile menu toggle */}
//           <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? "✖" : "☰"}
//           </div>

//           {/* Navigation links */}
//           <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
//             <li>
//               <Link to="/" className={location.pathname === "/" ? "active" : ""}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/services" className={location.pathname === "/services" ? "active" : ""}>
//                 Services
//               </Link>
//             </li>
//             <li>
//               <Link to="/blogs" className={location.pathname === "/blogs" ? "active" : ""}>
//                 Blogs
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
//                 Contact Us
//               </Link>
//             </li>
//           </ul>
//         </div>
//       </nav>

//       {/* Pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/blogs" element={<Blogs />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Privacy from './Privacy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Chandrarajmerisha/Psoriasis-APP.git
git push -u origin main