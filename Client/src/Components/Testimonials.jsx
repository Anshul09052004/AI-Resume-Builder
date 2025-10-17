import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Software Engineer at Google",
    feedback:
      "ResumeAI helped me build a professional resume in minutes! I landed multiple interviews within a week. Highly recommended!",
  },
  {
    name: "Priya Sharma",
    role: "UI/UX Designer at Canva",
    feedback:
      "The AI suggestions were spot on. It helped me highlight my design projects perfectly. The UI is super smooth!",
  },
  {
    name: "Rahul Verma",
    role: "Data Analyst at Microsoft",
    feedback:
      "This tool makes resume building effortless. The templates and real-time suggestions are game-changers for job seekers.",
  },
];

function Testimonials() {
  return (
    <section id="Testimonials" className=" text-white py-24 px-4 relative overflow-hidden ">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          What Our Users Say
        </h2>
        <p className="text-gray-400 mt-3">
          Trusted by professionals from top companies worldwide
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="flex flex-wrap justify-center gap-10 px-6 md:px-10 max-w-6xl mx-auto">
        {testimonials.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-black/20 border border-gray-800 rounded-2xl p-6 w-[320px] md:w-[360px] shadow-lg hover:shadow-green-600/20 transition backdrop-blur-sm"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{user.name}</h3>
                <p className="text-gray-400 text-sm">{user.role}</p>
              </div>
            </div>

            {/* Feedback */}
            <p className="text-gray-300 mt-4 text-sm">{user.feedback}</p>

            {/* Stars */}
            <div className="flex mt-4 text-green-500">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
