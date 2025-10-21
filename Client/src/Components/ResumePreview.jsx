import React from "react";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalImageTemplate from "./templates/MinimalImageTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import CorporateTemplate from "./templates/CorporateTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import EligentTemplate from "./templates/EligentTemplate";
import ModernPlusTemplate from "./templates/ModernPlusTemplate";
import NeoTemplate from "./templates/NeoTemplate";
import PortfolioTemplate from "./templates/PortfolioTemplate";
import TechTemplate from "./templates/TechTemplate";
import TimeLineTemplate from "./templates/TimeLineTemplate";

function ResumePreview({ data, template, accentColor, classes = "" }) {
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "corporate":
        return <CorporateTemplate data={data} accentColor={accentColor} />;
      case "creative":
        return <CreativeTemplate data={data} accentColor={accentColor} />;
      case "eligent":
        return <EligentTemplate data={data} accentColor={accentColor} />;
      case "modern-plus":
        return <ModernPlusTemplate data={data} accentColor={accentColor} />;
      case "neo":
        return <NeoTemplate data={data} accentColor={accentColor} />;
      case "portfolio":
        return <PortfolioTemplate data={data} accentColor={accentColor} />;
      case "tech":
        return <TechTemplate data={data} accentColor={accentColor} />;
      case "time-line":
        return <TimeLineTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return <MinimalImageTemplate data={data} accentColor={accentColor} />;
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div
      className={`w-full bg-gray-100 flex justify-center items-start p-4 sm:p-6 md:p-8 overflow-y-auto rounded-2xl ${classes}`}
    >
      <div
        id="resume-preview"
        className="w-full max-w-[950px] bg-white rounded-2xl shadow-2xl border border-gray-200 
                   flex flex-col gap-8 p-6 sm:p-8 md:p-12 transition-all duration-300 overflow-hidden"
      >
        {/* Accent color bar */}
        <div
          className="h-2 w-full rounded-full shadow-sm"
          style={{ backgroundColor: accentColor }}
        ></div>

        {/* Template content */}
        <div className="w-full overflow-x-hidden overflow-y-visible break-words text-gray-800 leading-relaxed text-[0.95rem]">
          {renderTemplate()}
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-8">
          Resume generated with{" "}
          <span className="font-semibold text-gray-500">ResumeAI</span>
        </div>
      </div>
    </div>
  );
}

export default ResumePreview;
