import React, { useState } from "react";
import api from "../Config/Api";
import { CiCirclePlus } from "react-icons/ci";
import { FaBriefcase, FaTrash } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { useSelector } from "react-redux";

function ExperienceForm({ data, onChange }) {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(-1);

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      is_current: false,
      description: "",
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generatingDescription = async (index) => {
    setGeneratingIndex(index);
    const exp = data[index];
    const prompt = `Enhance my job description for ${exp.position} at ${exp.company}: ${exp.description}`;
    try {
      const { data } = await api.post(
        "/api/v1/ai/enhance-job-desc",
        { userContent: prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      updateExperience(index, "description", data.enhanceContent);
    } catch (error) {
      console.error("Error enhancing job description:", error);
    }
    setGeneratingIndex(-1);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your previous work experiences
          </p>
        </div>

        <button
          onClick={addExperience}
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600 text-white px-5 py-2 rounded-xl shadow-md font-medium transition-all duration-300 active:scale-95"
        >
          <CiCirclePlus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex flex-col items-center text-gray-500 mt-6 space-y-2 py-6">
          <FaBriefcase className="w-10 h-10 text-indigo-400" />
          <p className="font-medium text-gray-600">
            No experience added yet.
          </p>
          <p className="text-sm">Click “Add Experience” to start adding jobs.</p>
        </div>
      )}

      {/* Experience Cards */}
      {data.map((experience, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-5 space-y-4 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Header */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-700">
              Experience #{index + 1}
            </h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700 transition-all"
              title="Remove Experience"
            >
              <FaTrash />
            </button>
          </div>

          {/* Inputs */}
          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Company Name"
              value={experience.company || ""}
              onChange={(e) => updateExperience(index, "company", e.target.value)}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={experience.position || ""}
              onChange={(e) => updateExperience(index, "position", e.target.value)}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input
              type="month"
              value={experience.start_date || ""}
              onChange={(e) =>
                updateExperience(index, "start_date", e.target.value)
              }
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all"
            />
            <input
              type="month"
              value={experience.end_date || ""}
              onChange={(e) =>
                updateExperience(index, "end_date", e.target.value)
              }
              disabled={experience.is_current}
              className="p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition-all disabled:opacity-60"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2 text-gray-700 font-medium">
            <input
              type="checkbox"
              checked={experience.is_current}
              onChange={(e) =>
                updateExperience(index, "is_current", e.target.checked)
              }
              className="w-4 h-4 accent-indigo-500"
            />
            Currently Working Here
          </label>

          {/* Description + AI Enhance */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">
                Job Description
              </label>
              <button
                onClick={() => generatingDescription(index)}
                disabled={generatingIndex === index}
                className={`relative flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 active:scale-95 ${
                  generatingIndex === index
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 hover:from-blue-600 hover:to-indigo-600"
                }`}
              >
                {generatingIndex === index ? (
                  <>
                    <HiOutlineSparkles className="animate-spin text-yellow-300" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles className="animate-pulse text-yellow-300" />
                    Enhance with AI
                  </>
                )}
              </button>
            </div>

            <textarea
              rows={4}
              value={experience.description || ""}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              placeholder="Describe your key responsibilities and achievements..."
              className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none resize-none transition-all"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperienceForm;
