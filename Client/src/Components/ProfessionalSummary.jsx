import React, { useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";

function ProfessionalSummary({ data, onChange }) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  // Demo AI enhancement (you can connect real API later)
  const handleEnhance = async () => {
    setIsEnhancing(true);

    // simulate AI text enhancement delay
    setTimeout(() => {
      const improvedText =
        (data || "") +
        "\n✨ Enhanced with AI: Emphasized achievements and professional goals clearly.";
      onChange(improvedText);
      setIsEnhancing(false);
    }, 1200);
  };

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

        {/* AI Enhance Button */}
        <button
          type="button"
          onClick={handleEnhance}
          disabled={isEnhancing}
          className={`relative flex items-center gap-2 text-sm font-medium text-white 
            bg-gradient-to-r from-indigo-500 to-blue-500 
            hover:from-blue-600 hover:to-indigo-600 
            px-5 py-2 rounded-xl shadow-md 
            transition-all duration-300 active:scale-95 
            ${
              isEnhancing
                ? "opacity-70 cursor-not-allowed"
                : "hover:shadow-lg hover:shadow-blue-300/50"
            }`}
        >
          {isEnhancing ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enhancing...
            </>
          ) : (
            <>
              <HiOutlineSparkles className="w-5 h-5 animate-pulse text-yellow-300" />
              AI Enhance
            </>
          )}
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
          💡 Tip: Keep it concise (3–4 sentences) and focused on your best
          strengths and career goals.
        </p>
      </div>
    </div>
  );
}

export default ProfessionalSummary;
