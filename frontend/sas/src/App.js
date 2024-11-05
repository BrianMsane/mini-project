// App.js
import React from "react";
import "./App.css";

import Navbar from "./components/home/Navbar";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import TestimonialsCarousel from "./components/home/TestimonialsCarousel";
import ProcessSection from "./components/home/ProcessSection";
import FAQSection from "./components/home/FAQSection";
// import Footer from "./components/home/Footer";
import Login from "./components/signin";
import SignUp from "./components/signup";

function App() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsCarousel />
      <ProcessSection />
      <FAQSection />
      <Footer />
    </>
  );
}

export default App;
