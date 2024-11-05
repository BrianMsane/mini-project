// src/components/ProgressBar.js
import React from "react";
import "./ProgressBar.css";

function ProgressBar({ steps, currentStep }) {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${currentStep - 1 >= index ? "active" : ""}`}
          data-title={step}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;
