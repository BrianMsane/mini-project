// TestimonialsCarousel.js
import React from "react";
import "./TestimonialsCarousel.css"; // Import your CSS
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import SwiperCore, { Autoplay, Pagination } from "swiper";

// Install Swiper modules
SwiperCore.use([Autoplay, Pagination]);

function TestimonialsCarousel() {
  const testimonials = [
    {
      quote:
        "EduSphere made my university application process so much easier and stress-free!",
      author: "Musa Dlamini",
    },
    {
      quote:
        "I loved the personalized recommendations. It helped me find the perfect program!",
      author: "Brian Msane",
    },
    {
      quote:
        "It was a wonderful experience and I got all the information at my fingertips.",
      author: "Joe Dennis",
    },
  ];

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <h2>What Our Users Say</h2>
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <p>"{testimonial.quote}"</p>
                <h3>- {testimonial.author}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialsCarousel;
