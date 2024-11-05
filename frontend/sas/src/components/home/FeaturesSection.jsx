// FeaturesSection.js
import React from "react";
import "./styles/home/FeaturesSection.css"; // Import your CSS

function FeaturesSection() {
  const features = [
    {
      icon: "fas fa-lightbulb",
      title: "AI-Powered Recommendations",
      description:
        "Get personalized program suggestions based on your results and interests.",
    },
    {
      icon: "fas fa-bell",
      title: "Instant Updates",
      description:
        "Stay informed about application deadlines, institution announcements, and more.",
    },
    {
      icon: "fas fa-paper-plane",
      title: "Easy Applications",
      description:
        "Apply seamlessly to institutions with our user-friendly platform.",
    },
    {
      icon: "fas fa-info-circle",
      title: "Comprehensive Information",
      description:
        "Access detailed program information to make confident decisions.",
    },
  ];

  return (
    <section className="features" id="features">
      <div className="container">
        <h2>Why Choose EduSphere?</h2>
        <div className="feature-cards">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <i className={feature.icon}></i>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
