import React from "react";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Testimonials from "../Components/Testimonials";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
      <Hero />
      <Features />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
