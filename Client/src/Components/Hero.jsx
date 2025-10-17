import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { MdOutlineMenu } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { Link as RouterLink } from "react-router-dom"; // React Router link for pages
import { Link } from "react-scroll"; // React Scroll link for smooth scrolling

function Hero() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openNavbar = () => setMenuOpen(true);
  const closeNavbar = () => setMenuOpen(false);

  return (
    <section
      id="Home"
      className="relative flex flex-col items-center text-white pb-32 pt-28 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden"
    >
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[90%] max-w-6xl px-6 py-3 border border-gray-700 rounded-full backdrop-blur-md bg-black/40 shadow-lg"
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
            ResumeAI
          </h2>
        </div>

        {/* Desktop Menu */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex items-center gap-6 text-gray-300"
        >
          <Link
            to="Home"
            smooth={true}
            duration={600}
            offset={-80}
            className="hover:text-green-400 transition cursor-pointer"
          >
            Home
          </Link>

          <Link
            to="Features"
            smooth={true}
            duration={600}
            offset={-80}
            className="hover:text-green-400 transition cursor-pointer"
          >
            Features
          </Link>

          <Link
            to="Testimonials"
            smooth={true}
            duration={600}
            offset={-80}
            className="hover:text-green-400 transition cursor-pointer"
          >
            Testimonials
          </Link>

          <Link
            to="Contact"
            smooth={true}
            duration={600}
            offset={-80}
            className="hover:text-green-400 transition cursor-pointer"
          >
            Contact
          </Link>
        </motion.div>

        {/* Login Button */}
        <RouterLink to="/login" className="hidden md:block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-full font-medium shadow-md hover:shadow-green-500/30 transition"
          >
            Login
          </motion.button>
        </RouterLink>

        {/* Hamburger Button */}
        <button onClick={openNavbar} className="md:hidden">
          <MdOutlineMenu className="size-7" />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-6 text-lg font-medium"
        >
          <Link
            to="Home"
            smooth={true}
            duration={600}
            offset={-80}
            onClick={closeNavbar}
            className="hover:text-green-400 cursor-pointer"
          >
            Home
          </Link>
          <Link
            to="Features"
            smooth={true}
            duration={600}
            offset={-80}
            onClick={closeNavbar}
            className="hover:text-green-400 cursor-pointer"
          >
            Features
          </Link>
          <Link
            to="Testimonials"
            smooth={true}
            duration={600}
            offset={-80}
            onClick={closeNavbar}
            className="hover:text-green-400 cursor-pointer"
          >
            Testimonials
          </Link>
          <Link
            to="Contact"
            smooth={true}
            duration={600}
            offset={-80}
            onClick={closeNavbar}
            className="hover:text-green-400 cursor-pointer"
          >
            Contact
          </Link>

          <RouterLink to="/login" onClick={closeNavbar}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full font-medium shadow-md hover:shadow-green-500/30 transition"
            >
              Login
            </motion.button>
          </RouterLink>

          <button
            onClick={closeNavbar}
            className="absolute top-5 right-6 text-gray-300 hover:text-white transition"
          >
            <RxCross2 className="size-7" />
          </button>
        </motion.div>
      )}

      {/* Hero Tagline Section */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-24 flex flex-col items-center text-center"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center bg-green-500/10 border border-green-700 rounded-full px-4 py-2 text-sm backdrop-blur-md"
        >
          <div className="flex items-center">
            <img
              className="size-7 rounded-full border-2 border-white"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=50"
              alt="user1"
            />
            <img
              className="size-7 rounded-full border-2 border-white -translate-x-2"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=50"
              alt="user2"
            />
            <img
              className="size-7 rounded-full border-2 border-white -translate-x-4"
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=50"
              alt="user3"
            />
          </div>
          <p className="-translate-x-2 text-gray-300">
            Join community of{" "}
            <span className="text-green-400 font-semibold">1M+</span> founders
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold max-w-4xl mt-8 bg-gradient-to-r from-green-400 via-white to-gray-400 bg-clip-text text-transparent leading-tight"
        >
          Build a Resume That Gets You Hired Faster with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-gray-400 md:text-base text-sm max-w-2xl mt-4"
        >
          Create a professional resume in minutes with our AI-powered resume
          builder. Tailor your resume to any job description and land your dream
          job faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center gap-3 mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-full font-medium flex items-center gap-2 transition shadow-md hover:shadow-green-500/40"
          >
            Get Started <FaArrowRight />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 border border-gray-600 rounded-full font-medium hover:bg-white/10 transition"
          >
            Learn More
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Background Glow Effects */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-green-400/10 blur-3xl rounded-full"></div>
    </section>
  );
}

export default Hero;
