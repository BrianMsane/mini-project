// src/components/Step6.js
import React from "react";
import "./FormStep.css";

function Step6({ formData, handleChange, nextStep, prevStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Upload Documents</h3>
      <div className="form-group">
        <label htmlFor="transcripts">Academic Transcripts *</label>
        <input
          type="file"
          id="transcripts"
          name="transcripts"
          accept=".pdf,.jpg,.png"
          onChange={handleChange}
          className={errors.transcripts && "invalid"}
        />
        {errors.transcripts && (
          <div className="error-message">{errors.transcripts}</div>
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

export default Step6;
