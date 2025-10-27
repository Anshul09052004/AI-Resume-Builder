import React, { useState } from "react";
import { HiOutlineSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";
import api from "../Config/Api";

function ProfessionalSummary({ data, onChange, setResumeData }) {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    try {
      setIsGenerating(true);
      const prompt = `Enhance my professional summary for resume: ${data}`;
      const response = await api.post(
        "/api/v1/ai/enhance-pro-sum",
        { userContent: prompt },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response.data.enhanceContent,
      }));
    } catch (error) {
      console.error("Error generating professional summary:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 space-y-5 transition-all hover:shadow-2xl duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Craft a compelling introduction that highlights your expertise.
          </p>
        </div>

        {/* AI Enhance Button */}
        <button
          type="button"
          onClick={generateSummary}
          disabled={isGenerating}
          className={`group relative flex items-center gap-2 text-sm font-semibold text-white 
            bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 
            px-5 py-2 rounded-xl shadow-md 
            transition-all duration-300 active:scale-95
            ${
              isGenerating
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-indigo-400/40"
            }`}
        >
          {isGenerating ? (
            <>
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Enhancing...
            </>
          ) : (
            <>
              <HiOutlineSparkles className="w-5 h-5 text-yellow-300 group-hover:animate-pulse" />
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
          placeholder="Write a professional summary highlighting your achievements and goals..."
          className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 placeholder-gray-400 resize-none transition-all duration-200 shadow-inner"
        />
        <p className="text-sm text-gray-500 mt-2">
          💡 <span className="font-medium text-gray-600">Tip:</span> Keep it concise (3–4 sentences) and focused on your strengths & goals.
        </p>
      </div>
    </div>
  );
}

export default ProfessionalSummary;
