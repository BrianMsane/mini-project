// ProcessSection.js
import React from "react";
import "./styles/home/ProcessSection.css"; // Import your CSS

function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Get Started",
      description: "Get started creating your account easily",
    },
    {
      number: "2",
      title: "Provide Details",
      description: "Provide your academic and personal information",
    },
    {
      number: "3",
      title: "Recommendations",
      description:
        "Receive AI-powered recommendations tailored for you based on your results",
    },
    {
      number: "4",
      title: "One-click Apply",
      description: "Select your programs of choice and let us handle the rest.",
    },
  ];

  return (
    <section className="process" id="process">
      <div className="container">
        <h2>Start Your Journey in 4 Easy Steps</h2>
        <div className="process-steps">
          {steps.map((step, index) => (
            <div className="process-step" key={index}>
              <div className="step-number">{step.number}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
