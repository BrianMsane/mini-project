import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import "./styles/signin.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // Optional error states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Effect to populate username and password from URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setUsername(urlParams.get("username") || "");
    setPassword(urlParams.get("password") || "");
  }, []);

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Form validation (if needed)
    if (username === "") {
      setUsernameError("Username is required");
      return;
    } else {
      setUsernameError("");
    }

    if (password === "") {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    const data = { username, password };
    try {
      const response = await fetch("http://127.0.0.1:3016/login-process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.redirected) {
        window.location.href = response.url;
      } else {
        const result = await response.json();
        console.log(result);
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
        <title>Login</title>
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
        <div className="wrapper">
          <form id="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <i className="fas fa-user"></i>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <span id="username_error">{usernameError}</span>
            </div>
            <div className="input-box">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span id="pass_error">{passwordError}</span>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="http://127.0.0.1:3016/signup">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
