// src/components/Step3.js
import React from "react";
import "./FormStep.css";

function Step3({ formData, handleChange, nextStep, prevStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Next of Kin Information</h3>
      <div className="form-group">
        <label htmlFor="kinFirstName">First Name *</label>
        <input
          type="text"
          id="kinFirstName"
          name="kinFirstName"
          value={formData.kinFirstName}
          onChange={handleChange}
          className={errors.kinFirstName && "invalid"}
        />
        {errors.kinFirstName && (
          <div className="error-message">{errors.kinFirstName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="kinMiddleName">Middle Name</label>
        <input
          type="text"
          id="kinMiddleName"
          name="kinMiddleName"
          value={formData.kinMiddleName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="kinLastName">Last Name *</label>
        <input
          type="text"
          id="kinLastName"
          name="kinLastName"
          value={formData.kinLastName}
          onChange={handleChange}
          className={errors.kinLastName && "invalid"}
        />
        {errors.kinLastName && (
          <div className="error-message">{errors.kinLastName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="relationship">Relationship *</label>
        <input
          type="text"
          id="relationship"
          name="relationship"
          value={formData.relationship}
          onChange={handleChange}
          className={errors.relationship && "invalid"}
        />
        {errors.relationship && (
          <div className="error-message">{errors.relationship}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="kinMobile">Mobile *</label>
        <input
          type="tel"
          id="kinMobile"
          name="kinMobile"
          value={formData.kinMobile}
          onChange={handleChange}
          className={errors.kinMobile && "invalid"}
        />
        {errors.kinMobile && (
          <div className="error-message">{errors.kinMobile}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="kinEmail">Email Address *</label>
        <input
          type="email"
          id="kinEmail"
          name="kinEmail"
          value={formData.kinEmail}
          onChange={handleChange}
          className={errors.kinEmail && "invalid"}
        />
        {errors.kinEmail && (
          <div className="error-message">{errors.kinEmail}</div>
        )}
      </div>
      <div className="form-navigation">
        <button type="button" className="prev-btn" onClick={prevStep}>
          Previous
        </button>
        <button type="button" className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Step3;
