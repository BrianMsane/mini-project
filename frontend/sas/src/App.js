// App.js
import React from "react";
import "./App.css";
import Login from "./components/signin";
import SignUp from "./components/signup";
import Home from "./components/home";
import AdmissionForm from "./components/AdmissionForm";
import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
  return (
    <>
      <AdmissionForm />
    </>
  );
}

export default App;
