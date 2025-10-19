import React, { useState, useEffect, useRef } from "react";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

function TemplateSection({ selectedTemplate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const templates = [
    {
      id: "classic",
      name: "Classic",
      description: "A simple and clean resume template with a modern and professional look.",
    },
    {
      id: "modern",
      name: "Modern",
      description: "A sleek and modern resume template with a professional look.",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "A minimalistic resume template with a professional look.",
    },
    {
      id: "minimal-image",
      name: "Minimal with Image",
      description: "A minimalistic template with a profile image.",
    },
  ];

  const currentTemplate = templates.find((t) => t.id === selectedTemplate);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-72" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all font-medium"
      >
        <RiLayoutGridFill className="text-lg" /> 
        <span>Templates</span>
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-all ${
                selectedTemplate === template.id
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div>
                <p className="font-semibold">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </div>
              {selectedTemplate === template.id && <FaCheck />}
            </div>
          ))}
        </div>
      )}

      {/* Selected Template Info */}
      {/* {currentTemplate && (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h4 className="font-semibold text-gray-800 mb-1">{currentTemplate.name}</h4>
          <p className="text-sm text-gray-500">{currentTemplate.description}</p>
          <div className="mt-2 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Preview Placeholder
          </div>
        </div>
      )} */}
    </div>
  );
}

export default TemplateSection;
