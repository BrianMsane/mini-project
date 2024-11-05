import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ProcessSection from "./components/ProcessSection";
import FAQSection from "./components/FAQSection";
import Footer from "./components/Footer";

function Home() {
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

export default Home;
