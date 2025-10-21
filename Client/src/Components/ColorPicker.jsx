import React, { useState } from "react";
import { FaPalette, FaCheck, FaChevronDown, FaChevronUp } from "react-icons/fa";

function ColorPicker({ selectedColor, onChange }) {
  const colors = [
    { name: "Red", value: "#ff0000" },
    { name: "Green", value: "#00ff00" },
    { name: "Blue", value: "#0000ff" },
    { name: "Yellow", value: "#ffff00" },
    { name: "Black", value: "#000000" },
    { name: "Gray", value: "#808080" },
    { name: "Orange", value: "#ffa500" },
    { name: "Purple", value: "#800080" },
    { name: "Pink", value: "#ffc0cb" },
    { name: "Brown", value: "#a52a2a" },
    { name: "Teal", value: "#008080" },
    { name: "Maroon", value: "#800000" },
    { name: "Lime", value: "#00ff00" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-48">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 w-full px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all font-medium"
      >
        <div className="flex items-center gap-2">
          <FaPalette /> <span>Accent</span>
        </div>
        {/* Arrow */}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 max-h-60 overflow-y-auto">
          {colors.map((color) => (
            <div
              key={color.value}
              onClick={() => {
                onChange(color.value);
                setIsOpen(false);
              }}
              className={`flex items-center justify-between p-3 cursor-pointer hover:bg-gray-100 transition-all ${
                selectedColor === color.value
                  ? "bg-green-600 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.value }}
                ></div>
                <span>{color.name}</span>
              </div>
              {selectedColor === color.value && <FaCheck />}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorPicker;
