import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import logo from "../assets/logo.svg";

function Footer() {
    return (
        <footer id="Footer" className="mt-17 relative bg-gradient-to-b from-gray-900 to-black text-gray-300 py-12 px-6 border-t border-gray-800 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-10 left-10 w-72 h-72 bg-green-600/20 blur-3xl rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-3xl rounded-full"></div>

            <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* Logo & About */}
                <div>
                    <div className="flex items-center gap-2 mb-4">
        
                        <h2 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                            ResumeAI
                        </h2>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Build your dream career with the power of AI. Create resumes that get noticed — fast, smart, and professional.
                    </p>

                    <div className="flex items-center gap-4 mt-5">
                        <a href="#" className="hover:text-green-400 transition text-2xl">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-green-400 transition text-2xl">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-green-400 transition text-2xl">
                            <FaLinkedinIn />
                        </a>
                        <a href="#" className="hover:text-green-400 transition text-2xl">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-green-400 transition cursor-pointer">Home</li>
                        <li className="hover:text-green-400 transition cursor-pointer">Features</li>
                        <li className="hover:text-green-400 transition cursor-pointer">Pricing</li>
                        <li className="hover:text-green-400 transition cursor-pointer">Testimonials</li>
                    </ul>
                </div>



                {/* Subscribe Section */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-lg">Stay Updated</h3>
                    <p className="text-gray-400 text-sm mb-3">
                        Subscribe to our newsletter for latest updates and AI job tips.
                    </p>
                    <form className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-4 py-2 text-sm focus:outline-none w-full text-gray-200"
                        />
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} ResumeAI — All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
