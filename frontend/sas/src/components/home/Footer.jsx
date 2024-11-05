// Footer.js
import React from "react";
import "./styles/home/Footer.css"; // Import your CSS

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h2 className="logo-text">EduSphere</h2>
            <p>
              Leveraging cutting-edge technologies to revolutionize student
              applications to colleges, universities, and other tertiary
              institutions. Bridging the knowledge gap with data-driven
              decision-making.
            </p>
            <div className="social-icons">
              <a href="#">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
          {/* Navigation Links */}
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#features">Features</a>
              </li>
              <li>
                <a href="#process">Process</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
            </ul>
          </div>
          {/* Legal Links */}
          <div className="footer-section links">
            <h2>Legal</h2>
            <ul>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; {new Date().getFullYear()} EduSphere. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
