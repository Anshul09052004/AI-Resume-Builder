import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { FaArrowLeft, FaUserTie, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import PersonalInfoForm from "../Components/PersonalInfoForm";
import ResumePreview from "../Components/ResumePreview";
import TemplateSection from "../Components/TemplateSection";
import ColorPicker from "../Components/ColorPicker";

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    skills: [],
    experience: [],
    education: [],
    projects: [],
    template: "classic",
    accent_color: "#3b82F6",
    public: false,
  });

  const { resumeId } = useParams();
  const [removeBackground, setRemoveBackground] = useState(false);
  const sections = ["personal", "summary", "skills", "experience", "education", "projects"];
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  useEffect(() => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  const activeSection = sections[activeSectionIndex];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
        <Link to="/app">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md">
            <FaArrowLeft className="text-sm" />
            Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left: Form + Controls */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between h-full">
          <div className="space-y-4">
            {/* Section Title */}
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUserTie />{" "}
              {activeSection === "personal"
                ? "Personal Information"
                : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>

            {/* Top Controls: Template + Accent + Navigation */}
            <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
              {/* Left: Template + Accent */}
              <div className="flex gap-2 flex-shrink-0">
                <div className="w-32">
                  <TemplateSection
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                </div>
                <div className="w-24">
                  <ColorPicker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({ ...prev, accent_color: color }))
                    }
                  />
                </div>
              </div>

              {/* Right: Previous + Next Buttons */}
              <div className="flex gap-2 flex-shrink-0">
                {activeSectionIndex > 0 && (
                  <button
                    onClick={() => setActiveSectionIndex((prev) => prev - 1)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 text-sm"
                  >
                    <FaChevronLeft /> Previous
                  </button>
                )}

                {activeSectionIndex < sections.length - 1 && (
                  <button
                    onClick={() => setActiveSectionIndex((prev) => prev + 1)}
                    className="flex items-center gap-1 px-3 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 text-sm"
                  >
                    Next <FaChevronRight />
                  </button>
                )}
              </div>
            </div>

            {/* Active Form Section */}
            <div className="mt-4">
              {activeSection === "personal" ? (
                <PersonalInfoForm
                  data={resumeData.personal_info}
                  onChange={(field, value) =>
                    setResumeData((prev) => ({
                      ...prev,
                      personal_info: { ...prev.personal_info, [field]: value },
                    }))
                  }
                  removeBackground={removeBackground}
                  setRemoveBackground={setRemoveBackground}
                />
              ) : (
                <p className="text-gray-500 mt-4 italic">
                  Form for <span className="font-medium">{activeSection}</span> will appear here.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-gray-50 rounded-3xl shadow-inner p-6 flex items-start justify-center overflow-auto">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="w-full max-w-4xl mx-4"
          />
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
