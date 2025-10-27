import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { HiOutlineSparkles } from "react-icons/hi";

function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState("");

  const addNewSkills = () => {
    const skill = newSkill.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setNewSkill("");
    }
  };

  const removeSkill = (_, index) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addNewSkills();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-2xl p-6 space-y-6 transition-all hover:shadow-2xl duration-300">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
          Skills
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your professional and technical skills
        </p>
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add Skill (e.g. React, Node.js, MongoDB)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent text-gray-800 placeholder-gray-400 transition-all duration-200 shadow-inner"
        />
        <button
          onClick={addNewSkills}
          disabled={!newSkill.trim()}
          className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 text-white rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
        >
          <CiCirclePlus className="w-6 h-6" />
        </button>
      </div>

      {/* Skills List */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-medium border border-indigo-100 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {skill}
              <button
                onClick={(e) => removeSkill(e, index)}
                className="text-red-500 hover:text-red-700 font-bold"
                title="Remove Skill"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 space-y-2 py-4">
          <HiOutlineSparkles className="w-8 h-8 mx-auto text-indigo-400 animate-pulse" />
          <p className="font-semibold text-gray-600">No skills added yet</p>
          <p className="text-sm text-gray-500">
            Add your skills to showcase your expertise
          </p>
          <p className="text-sm mt-2 text-gray-600">
            💡 <span className="font-medium">Tip:</span> Add 8–10 key skills for a balanced profile
          </p>
        </div>
      )}
    </div>
  );
}

export default SkillsForm;
