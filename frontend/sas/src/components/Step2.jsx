// src/components/Step2.js
import React from "react";
import "./FormStep.css";

function Step2({ formData, handleChange, nextStep, prevStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Contact Information</h3>
      <div className="form-group">
        <label htmlFor="address">Address/P.O Box *</label>
        <textarea
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          className={errors.address && "invalid"}
        ></textarea>
        {errors.address && (
          <div className="error-message">{errors.address}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="city">City/Region *</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className={errors.city && "invalid"}
        />
        {errors.city && <div className="error-message">{errors.city}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="country">Country *</label>
        <input
          type="text"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          className={errors.country && "invalid"}
        />
        {errors.country && (
          <div className="error-message">{errors.country}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile *</label>
        <input
          type="tel"
          id="mobile"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className={errors.mobile && "invalid"}
        />
        {errors.mobile && <div className="error-message">{errors.mobile}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="homeTel">Home Telephone</label>
        <input
          type="tel"
          id="homeTel"
          name="homeTel"
          value={formData.homeTel}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email && "invalid"}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
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

export default Step2;
