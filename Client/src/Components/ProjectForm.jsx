import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

function ProjectForm({ data, onChange }) {
  const addProject = () => {
    const newProject = { name: "", type: "", description: "" };
    onChange([...data, newProject]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Projects</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your projects to showcase your experience
          </p>
        </div>
        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2.5 rounded-xl shadow-md font-medium transition-all"
        >
          <CiCirclePlus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex flex-col items-center justify-center text-gray-500 mt-6 gap-3">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
            <CiCirclePlus className="w-6 h-6 text-gray-400" />
          </div>
          <p className="font-medium text-center">No projects added yet.</p>
          <p className="text-sm text-center">
            Click “Add Project” to include your projects.
          </p>
        </div>
      )}

      {/* Projects List */}
      {data.map((project, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-xl p-5 space-y-5 bg-white shadow-sm hover:shadow-md transition-all"
        >
          {/* Title + Remove */}
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-gray-700">
              Project #{index + 1}
            </h4>
            <button
              onClick={() => removeProject(index)}
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Remove Project"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Project Name */}
            <input
              type="text"
              placeholder="Project Name"
              value={project.name || ""}
              onChange={(e) => {
                const input = e.target.value;
                const capitalized = input.replace(/\b\w/g, (c) =>
                  c.toUpperCase()
                );
                updateProject(index, "name", capitalized);
              }}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize placeholder-gray-400"
            />

            {/* Project Type */}
            <input
              type="text"
              placeholder="Project Type (e.g. Web App, ML Model, etc.)"
              value={project.type || ""}
              onChange={(e) => {
                const input = e.target.value;
                const capitalized = input.replace(/\b\w/g, (c) =>
                  c.toUpperCase()
                );
                updateProject(index, "type", capitalized);
              }}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 capitalize placeholder-gray-400"
            />
          </div>

          {/* Project Description */}
          <textarea
            rows={4}
            placeholder="Describe your project — tools used, features, and outcomes"
            value={project.description || ""}
            onChange={(e) => updateProject(index, "description", e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none placeholder-gray-400"
          />
        </div>
      ))}
    </div>
  );
}

export default ProjectForm;
