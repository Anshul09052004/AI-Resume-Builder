import React, { useState, useEffect, useRef } from "react";
import { RiLayoutGridFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

function TemplateSection({ selectedTemplate, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const itemRefs = useRef({}); // Refs for each template item

  const templates = [
    { id: "classic", name: "Classic", description: "A simple and clean resume template." },
    { id: "modern", name: "Modern", description: "A sleek and modern resume template." },
    { id: "minimal", name: "Minimal", description: "A minimalistic resume template." },
    { id: "minimal-image", name: "Minimal with Image", description: "Minimal template with profile image." },
    { id: "corporate", name: "Corporate", description: "Professional corporate resume." },
    { id: "creative", name: "Creative", description: "Creative design focused template." },
    { id: "eligent", name: "Eligent", description: "Elegent template." },
    { id: "modern-plus", name: "Modern Plus", description: "Modern plus template." },
    { id: "neo", name: "Neo", description: "Neo template." },
    { id: "portfolio", name: "Portfolio", description: "Portfolio style template." },
    { id: "tech", name: "Tech", description: "Tech focused template." },
    { id: "time-line", name: "Time Line", description: "Timeline style template." },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll into view when hovering a template
  const handleMouseEnter = (id) => {
    const ref = itemRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

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
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-y-auto max-h-72 z-50 border border-gray-200">
          {templates.map((template) => (
            <div
              key={template.id}
              ref={(el) => (itemRefs.current[template.id] = el)}
              onMouseEnter={() => handleMouseEnter(template.id)}
              onClick={() => {
                onChange(template.id);
                setIsOpen(false);
              }}
              className={`p-4 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-all ${selectedTemplate === template.id
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
    </div>
  );
}

export default TemplateSection;
