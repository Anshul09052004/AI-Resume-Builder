import React from "react";
import { motion } from "framer-motion";
import { FaRobot, FaMagic, FaFileAlt, FaCloudUploadAlt } from "react-icons/fa";

const features = [
  {
    id: 1,
    icon: <FaRobot className="text-green-500 text-4xl mb-3" />,
    title: "AI-Powered Resume Writing",
    desc: "Our AI suggests content and keywords based on your job title, helping you craft a resume that stands out from the crowd.",
  },
  {
    id: 2,
    icon: <FaMagic className="text-blue-400 text-4xl mb-3" />,
    title: "Smart Templates",
    desc: "Choose from a collection of modern, professional templates that automatically adjust to your information.",
  },
  {
    id: 3,
    icon: <FaFileAlt className="text-purple-400 text-4xl mb-3" />,
    title: "Instant PDF Download",
    desc: "Download your resume instantly in high-quality PDF format — perfectly formatted and ready to share.",
  },
  {
    id: 4,
    icon: <FaCloudUploadAlt className="text-yellow-400 text-4xl mb-3" />,
    title: "Import from LinkedIn",
    desc: "Save time by importing your existing profile data directly from LinkedIn with one click.",
  },
];

function Features() {
  return (
    <section className="bg-gradient-to-b from-black to-gray-900 text-white py-24 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-600/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-white to-gray-400 bg-clip-text text-transparent"
        >
          Powerful Features Built with AI
        </motion.h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Designed to make your resume creation process smarter, faster, and more impactful —
          powered by modern artificial intelligence.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 hover:bg-white/10 border border-gray-700 rounded-2xl p-6 text-center shadow-lg backdrop-blur-md transition-all"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mt-2 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm mt-3">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-14"
        >
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium shadow-md hover:shadow-green-500/40 transition">
            Try AI Resume Builder
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
