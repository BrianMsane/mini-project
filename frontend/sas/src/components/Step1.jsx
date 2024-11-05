// src/components/Step1.js
import React from "react";
import "./FormStep.css"; // Import common styles

function Step1({ formData, handleChange, nextStep, errors }) {
  return (
    <div className="form-step active">
      <h3>Personal Information</h3>
      <div className="form-group">
        <label htmlFor="firstName">First Name *</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className={errors.firstName && "invalid"}
        />
        {errors.firstName && (
          <div className="error-message">{errors.firstName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="middleName">Middle Name</label>
        <input
          type="text"
          id="middleName"
          name="middleName"
          value={formData.middleName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name *</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className={errors.lastName && "invalid"}
        />
        {errors.lastName && (
          <div className="error-message">{errors.lastName}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth *</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className={errors.dob && "invalid"}
        />
        {errors.dob && <div className="error-message">{errors.dob}</div>}
      </div>
      <div className="form-group">
        <label>Gender *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Other"
              checked={formData.gender === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        {errors.gender && <div className="error-message">{errors.gender}</div>}
      </div>
      <div className="form-group">
        <label htmlFor="nationality">Nationality *</label>
        <input
          type="text"
          id="nationality"
          name="nationality"
          value={formData.nationality}
          onChange={handleChange}
          className={errors.nationality && "invalid"}
        />
        {errors.nationality && (
          <div className="error-message">{errors.nationality}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="identityNumber">Identity Number *</label>
        <input
          type="text"
          id="identityNumber"
          name="identityNumber"
          value={formData.identityNumber}
          onChange={handleChange}
          className={errors.identityNumber && "invalid"}
        />
        {errors.identityNumber && (
          <div className="error-message">{errors.identityNumber}</div>
        )}
      </div>
      <div className="form-group">
        <label>Marital Status *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Single"
              checked={formData.maritalStatus === "Single"}
              onChange={handleChange}
            />
            Single
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Married"
              checked={formData.maritalStatus === "Married"}
              onChange={handleChange}
            />
            Married
          </label>
          <label>
            <input
              type="radio"
              name="maritalStatus"
              value="Other"
              checked={formData.maritalStatus === "Other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        {errors.maritalStatus && (
          <div className="error-message">{errors.maritalStatus}</div>
        )}
      </div>
      <div className="form-group">
        <label>Do you need student residence? *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="residence"
              value="Yes"
              checked={formData.residence === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="residence"
              value="No"
              checked={formData.residence === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {errors.residence && (
          <div className="error-message">{errors.residence}</div>
        )}
      </div>
      <div className="form-group">
        <label>Do you have any disabilities? *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="disabilities"
              value="Yes"
              checked={formData.disabilities === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="disabilities"
              value="No"
              checked={formData.disabilities === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {errors.disabilities && (
          <div className="error-message">{errors.disabilities}</div>
        )}
      </div>
      <div className="form-group">
        <label>Do you have any medical conditions? *</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="medicalConditions"
              value="Yes"
              checked={formData.medicalConditions === "Yes"}
              onChange={handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="medicalConditions"
              value="No"
              checked={formData.medicalConditions === "No"}
              onChange={handleChange}
            />
            No
          </label>
        </div>
        {errors.medicalConditions && (
          <div className="error-message">{errors.medicalConditions}</div>
        )}
      </div>
      <div className="form-navigation">
        <button type="button" className="next-btn" onClick={nextStep}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Step1;
