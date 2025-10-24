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
      className={`w-full flex justify-center items-start py-2 overflow-y-auto ${classes}`}
      style={{ backgroundColor: "#f4f6f8" }}
    >
      <div
        id="resume-preview"
        className="w-full max-w-[794px] h-[1123px] bg-white rounded-md border border-gray-300 
                   shadow-sm flex flex-col gap-2 p-4 sm:p-5 
                   transition-all duration-300 overflow-hidden print:h-auto"
        style={{
          transform: "scale(0.88)",
          transformOrigin: "top center",
          lineHeight: "1.2",
        }}
      >
        {/* Accent color bar */}
        <div
          className="h-[3px] w-full rounded-md mb-1"
          style={{ backgroundColor: accentColor }}
        ></div>

        {/* Template content */}
        <div className="w-full overflow-hidden text-gray-900 text-[0.85rem] leading-snug tracking-tight">
          {renderTemplate()}
        </div>

      
       
      </div>
    </div>
  );
}

export default ResumePreview;
