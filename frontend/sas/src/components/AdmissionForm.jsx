// src/components/AdmissionForm.js
import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import "./AdmissionForm.css";

function AdmissionForm() {
  const [currentStep, setCurrentStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    // Step 1
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    nationality: "",
    identityNumber: "",
    maritalStatus: "",
    residence: "",
    disabilities: "",
    medicalConditions: "",
    // Step 2
    address: "",
    city: "",
    country: "",
    mobile: "",
    homeTel: "",
    email: "",
    // Step 3
    kinFirstName: "",
    kinMiddleName: "",
    kinLastName: "",
    relationship: "",
    kinMobile: "",
    kinEmail: "",
    // Step 4
    previousSchool: "",
    qualifications: "",
    grades: "",
    // Step 5
    preferredProgram: "",
    alternativeProgram: "",
    // Step 6
    transcripts: null,
    // Add other fields as needed
  });

  // Error state
  const [errors, setErrors] = useState({});

  const steps = [
    "Personal Information",
    "Contact Information",
    "Next of Kin",
    "Education Background",
    "Program Selection",
    "Upload Documents",
    "Review & Submit",
  ];

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Remove error message when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle navigation
  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};

    // Add validation logic based on currentStep
    switch (currentStep) {
      case 1:
        // Validate Step 1 fields
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.dob) newErrors.dob = "Date of Birth is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.nationality)
          newErrors.nationality = "Nationality is required";
        if (!formData.identityNumber)
          newErrors.identityNumber = "Identity Number is required";
        if (!formData.maritalStatus)
          newErrors.maritalStatus = "Marital Status is required";
        if (!formData.residence) newErrors.residence = "This field is required";
        if (!formData.disabilities)
          newErrors.disabilities = "This field is required";
        if (!formData.medicalConditions)
          newErrors.medicalConditions = "This field is required";
        break;

      case 2:
        // Validate Step 2 fields
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City/Region is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.mobile) newErrors.mobile = "Mobile is required";
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
          newErrors.email = "Email is invalid";
        }
        break;

      // Add cases for other steps

      default:
        break;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Email validation
  const validateEmail = (email) => {
    // Simple email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Submit form data to the server
      console.log("Form submitted:", formData);
      alert("Application Submitted Successfully!");
      // Reset form or redirect as needed
    }
  };

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );
      case 6:
        return (
          <Step6
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
            prevStep={prevStep}
            errors={errors}
          />
        );
      case 7:
        return (
          <Step7
            formData={formData}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section className="application-form">
      <div className="container">
        <h2>Admission Form</h2>
        <ProgressBar steps={steps} currentStep={currentStep} />
        <form id="applicationForm" onSubmit={handleSubmit}>
          {renderStep()}
        </form>
      </div>
    </section>
  );
}

export default AdmissionForm;
