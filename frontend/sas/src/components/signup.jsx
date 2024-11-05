import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "./signup.css";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    conf_password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    conf_password: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    if (formData.password !== formData.conf_password) {
      newErrors.conf_password = "Passwords do not match";
    }

    setErrors(newErrors);

    // If there are errors, do not proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:3016/signup-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const data = await response.json();
        console.log(data);
        // Handle response data as needed
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error as needed
    }
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
        <link rel="icon" type="image/jpeg" href="../images/logo.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </Helmet>
      <div className="container">
        <div className="form-box">
          <h2>Welcome to EduSphere!</h2>
          <form name="Formfill" onSubmit={handleSubmit}>
            <div className="input-box">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <span className="error">{errors.username}</span>
              )}
            </div>
            <div className="input-box">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="error">{errors.password}</span>
              )}
            </div>
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="conf_password"
                placeholder="Confirm Password"
                required
                value={formData.conf_password}
                onChange={handleChange}
              />
              {errors.conf_password && (
                <span className="error">{errors.conf_password}</span>
              )}
            </div>
            <button type="submit" className="btn">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
