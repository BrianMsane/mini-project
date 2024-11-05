// Navbar.js
import React, { useState } from "react";
import "../styles/home/Navbar.css"; // Import your CSS

function Navbar() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  const closeMenu = () => {
    setIsActive(false);
  };

  return (
    <header>
      <nav className="navbar">
        <div className="container">
          <a href="#" className="logo">
            <img src="./images/logo.png" alt="EduSphere Logo" />
          </a>
          <ul className={`nav-menu ${isActive ? "active" : ""}`}>
            <li>
              <a href="/about" onClick={closeMenu}>
                About Us
              </a>
            </li>
            <li>
              <a href="/contact" onClick={closeMenu}>
                Contact Us
              </a>
            </li>
            <li>
              <a href="/signin" className="btn-login" onClick={closeMenu}>
                Login
              </a>
            </li>
          </ul>
          <div
            className={`hamburger ${isActive ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
