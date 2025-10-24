import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaBriefcase, FaTrash } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

function ExperienceForm({ data, onChange }) {
  // Add new experience
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

  // Remove experience
  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  // Update experience field
  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  // AI enhancement simulation
  const handleEnhance = (index) => {
    const updated = [...data];
    updated[index].description =
      updated[index].description +
      "\n✨ Improved with AI: Highlighted achievements and responsibilities.";
    onChange(updated);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your job experiences here
          </p>
        </div>
        <button
          onClick={addExperience}
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2 rounded-xl shadow-md font-medium transition-all"
        >
          <CiCirclePlus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {/* No experience placeholder */}
      {data.length === 0 && (
        <div className="flex flex-col items-center gap-2 text-gray-500 mt-6">
          <FaBriefcase className="w-10 h-10" />
          <p>No experience added yet.</p>
          <p>Click "Add Experience" to start adding your job history.</p>
        </div>
      )}

      {/* Experiences List */}
      {data.map((experience, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-4 space-y-3 bg-white shadow-sm"
        >
          {/* Header with remove */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-700">
              Experience #{index + 1}
            </h4>
            <button
              onClick={() => removeExperience(index)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
          </div>

          {/* Inputs */}
          <input
            type="text"
            placeholder="Company Name"
            value={experience.company || ""}
            onChange={(e) => updateExperience(index, "company", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Job Title"
            value={experience.position || ""}
            onChange={(e) => updateExperience(index, "position", e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-2">
            <input
              type="month"
              value={experience.start_date || ""}
              onChange={(e) =>
                updateExperience(index, "start_date", e.target.value)
              }
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="month"
              value={experience.end_date || ""}
              onChange={(e) =>
                updateExperience(index, "end_date", e.target.value)
              }
              disabled={experience.is_current}
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Checkbox */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={experience.is_current}
              onChange={(e) =>
                updateExperience(index, "is_current", e.target.checked)
              }
              className="w-4 h-4"
            />
            <span>Currently Working Here</span>
          </label>

          {/* Description + AI Button */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-medium text-gray-700">
                Job Description
              </label>

              <button
                onClick={() => handleEnhance(index)}
                className="relative flex items-center gap-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 px-3 py-1.5 rounded-md shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 active:scale-95"
              >
                <HiOutlineSparkles className="animate-pulse text-yellow-300" />
                Enhance with AI
                <span className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-20 blur-md transition-opacity"></span>
              </button>
            </div>

            <textarea
              rows={4}
              value={experience.description || ""}
              onChange={(e) =>
                updateExperience(index, "description", e.target.value)
              }
              placeholder="Describe your key responsibilities and achievements"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExperienceForm;
