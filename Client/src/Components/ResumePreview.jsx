import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

function ResumePreview({ data, template, accentColor, classes = "" }) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      className={`w-full h-full p-6 bg-gray-100 dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-auto ${classes}`}
    >
      <div
        id="resume-preview"
        className="max-w-5xl mx-auto bg-white dark:bg-zinc-800 rounded-3xl shadow-lg p-8 transition-all duration-300 flex flex-col gap-6"
        style={{ marginLeft: "1rem", marginRight: "1rem" }} // Left and right margin for spacing
      >
        {/* Accent color bar */}
        <div
          className="h-2 w-full rounded-full"
          style={{ backgroundColor: accentColor }}
        ></div>

        {/* Template content */}
        {renderTemplate()}

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 dark:text-gray-500 mt-6">
          Resume generated with <span className="font-semibold">ResumeBuilder</span>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
