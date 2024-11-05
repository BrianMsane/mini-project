// HeroSection.js
import React from "react";
import "./HeroSection.css"; // Import your CSS

function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Empower Your Future with EduSphere</h1>
          <p>
            Improve your application process and get all the help and
            transparency into the university admission. Apply to universities
            from the comfort of your home with all the necessary information at
            your fingertips.
          </p>
          <a href="/signin" className="btn-primary">
            Get Started
          </a>
        </div>
        <div className="hero-image">
          <img src="./images/SLIDE1.jpg" alt="EduSphere" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
