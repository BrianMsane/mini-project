// src/components/Step5.js
import React from "react";
import "./FormStep.css";

function Step5({ formData, handleChange, nextStep, prevStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Program Selection</h3>
      <div className="form-group">
        <label htmlFor="preferredProgram">Preferred Program of Study *</label>
        <select
          id="preferredProgram"
          name="preferredProgram"
          value={formData.preferredProgram}
          onChange={handleChange}
          className={errors.preferredProgram && "invalid"}
        >
          <option value="">Select Program</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Business Administration">
            Business Administration
          </option>
          {/* Add more options */}
        </select>
        {errors.preferredProgram && (
          <div className="error-message">{errors.preferredProgram}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="alternativeProgram">Alternative Program</label>
        <select
          id="alternativeProgram"
          name="alternativeProgram"
          value={formData.alternativeProgram}
          onChange={handleChange}
        >
          <option value="">Select Program</option>
          <option value="Information Systems">Information Systems</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Marketing">Marketing</option>
          {/* Add more options */}
        </select>
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

export default Step5;
