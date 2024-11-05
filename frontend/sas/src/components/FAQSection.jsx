// FAQSection.js
import React, { useState } from "react";
import "../styles/home/FAQSection.css"; // Import your CSS

function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Does it include all institutions in Eswatini?",
      answer:
        "Absolutely! From UNESWA to Limkokwing, ASIT, and other tertiary institutions in Eswatini.",
    },
    {
      question: "What if I want to apply outside Eswatini?",
      answer: "This feature will soon be available.",
    },
    // Add more FAQs
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="container">
        <h2>Got Questions? We've Got Answers!</h2>
        <div className="faq-items">
          {faqs.map((faq, index) => (
            <div
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <h3>{faq.question}</h3>
                <i className="fas fa-chevron-down"></i>
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
