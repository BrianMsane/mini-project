// src/components/Step7.js
import React from "react";
import "./FormStep.css";
import "./Step7.css";

function Step7({ formData, prevStep, handleSubmit }) {
  return (
    <div className="form-step active">
      <h3>Review & Submit</h3>
      <p>Please review your information before submitting your application.</p>
      {/* Display summary */}
      <div className="summary">
        <h4>Personal Information</h4>
        <p>
          <strong>First Name:</strong> {formData.firstName}
        </p>
        <p>
          <strong>Last Name:</strong> {formData.lastName}
        </p>
        {/* Add other fields similarly */}
        {/* You can organize the summary into sections */}
      </div>
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button type="submit" className="submit-btn">
          Submit Application
        </button>
      </div>
    </div>
  );
}

export default Step7;
