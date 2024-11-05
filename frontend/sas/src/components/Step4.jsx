// src/components/Step4.js
import React from "react";
import "./FormStep.css";

function Step4({ formData, handleChange, nextStep, prevStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Education Background</h3>
      <div className="form-group">
        <label htmlFor="previousSchool">Previous School Attended *</label>
        <input
          type="text"
          id="previousSchool"
          name="previousSchool"
          value={formData.previousSchool}
          onChange={handleChange}
          className={errors.previousSchool && "invalid"}
        />
        {errors.previousSchool && (
          <div className="error-message">{errors.previousSchool}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="qualifications">Qualifications Obtained *</label>
        <textarea
          id="qualifications"
          name="qualifications"
          value={formData.qualifications}
          onChange={handleChange}
          className={errors.qualifications && "invalid"}
        ></textarea>
        {errors.qualifications && (
          <div className="error-message">{errors.qualifications}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="grades">Grades *</label>
        <textarea
          id="grades"
          name="grades"
          value={formData.grades}
          onChange={handleChange}
          className={errors.grades && "invalid"}
        ></textarea>
        {errors.grades && <div className="error-message">{errors.grades}</div>}
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

export default Step4;
