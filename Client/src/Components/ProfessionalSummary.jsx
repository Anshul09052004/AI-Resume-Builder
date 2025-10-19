import React from "react";
import { HiOutlineSparkles } from "react-icons/hi";

function ProfessionalSummary({ data, onChange, setResumeData }) {
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-5 transition-all">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        Professional Summary
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Add a short summary for your resume
                    </p>
                </div>
                <button
                    type="button"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white px-5 py-2 rounded-xl shadow-md font-medium transition-all"
                >
                    <HiOutlineSparkles className="w-5 h-5" />
                    AI Enhance
                </button>
            </div>

            {/* Textarea */}
            <div>
                <textarea
                    rows={7}
                    value={data || ""}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Write a professional summary highlighting your achievements and goals"
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none transition-all"
                />
                <p className="text-sm text-gray-500 mt-2">
                    Tip: Keep it concise (3-4 sentences) and focused on the most important information
                </p>
            </div>
        </div>
    );
}

export default ProfessionalSummary;
