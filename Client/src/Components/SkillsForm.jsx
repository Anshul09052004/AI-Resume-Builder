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
    <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-bold text-gray-800">Skills</h3>
        <p className="text-sm text-gray-500 mt-1">
          Add your skills to showcase your expertise
        </p>
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Add Skill (e.g. HTML, CSS, JavaScript)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addNewSkills}
          disabled={!newSkill.trim()}
          className="p-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CiCirclePlus className="w-5 h-5" />
        </button>
      </div>

      {/* Skills List or Empty State */}
      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {skill}
              <button
                onClick={(e) => removeSkill(e, index)}
                className="text-red-500 hover:text-red-700"
                title="Remove Skill"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 space-y-2">
          <HiOutlineSparkles className="w-8 h-8 mx-auto text-gray-400" />
          <p className="font-medium">No skills added yet</p>
          <p className="text-sm">Add your skills to showcase your expertise</p>
          <p className="text-sm mt-2 text-gray-600">
            <strong>💡 Tip:</strong> Add 8–10 skills for a balanced profile
          </p>
        </div>
      )}
    </div>
  );
}

export default SkillsForm;
