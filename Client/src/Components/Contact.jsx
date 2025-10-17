import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Yahan backend ya API call laga sakte ho
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="Contact" className="relative flex flex-col items-center text-white min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-white to-gray-400 bg-clip-text text-transparent text-center mb-8"
      >
        Get in Touch
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-400 max-w-2xl text-center mb-12"
      >
        Have questions, suggestions, or want to collaborate? Fill out the form
        below and we'll get back to you as soon as possible.
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-black/50 backdrop-blur-md rounded-xl p-8 flex flex-col gap-6 shadow-lg border border-gray-700"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        ></textarea>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition shadow-md hover:shadow-green-500/40"
        >
          Send Message
        </motion.button>

        {submitted && (
          <p className="text-green-400 text-center mt-2">
            Thanks for reaching out! We'll get back to you soon.
          </p>
        )}
      </motion.form>

      {/* Background Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400/10 blur-3xl rounded-full"></div>
    </section>
  );
}

export default Contact;
