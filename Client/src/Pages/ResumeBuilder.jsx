import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ProfessionalSummary from "../Components/ProfessionalSummary";
import ExperienceForm from "../Components/ExperienceForm";
import PersonalInfoForm from "../Components/PersonalInfoForm";
import ResumePreview from "../Components/ResumePreview";
import TemplateSection from "../Components/TemplateSection";
import ColorPicker from "../Components/ColorPicker";

import { FaArrowLeft, FaUserTie, FaChevronRight, FaChevronLeft } from "react-icons/fa";

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    skills: [],
    education: [],
    projects: [],
    template: "classic",
    accent_color: "#3b82F6",
    public: false,
  });

  const { resumeId } = useParams();
  const [removeBackground, setRemoveBackground] = useState(false);

  // Define sections
  const sections = ["personal", "summary", "skills", "experience", "education", "projects"];
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <Link to="/app">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md">
            <FaArrowLeft className="text-sm" />
            Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 max-w-7xl mx-auto">
        {/* Left: Form + Controls */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between h-full">
          <div className="space-y-5">
            {/* Section Title */}
            <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <FaUserTie />
              {activeSection === "personal"
                ? "Personal Information"
                : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h2>

            {/* Controls */}
            <div className="flex flex-col gap-4">
              {/* Top: Template + Accent */}
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex gap-3 flex-shrink-0">
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
              </div>

              {/* Bottom: Previous + Next Buttons */}
              <div className="flex justify-between items-center mt-2">
                {activeSectionIndex > 0 ? (
                  <button
                    onClick={() => setActiveSectionIndex((prev) => prev - 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all duration-200 text-sm"
                  >
                    <FaChevronLeft /> Previous
                  </button>
                ) : (
                  <div className="w-[100px]" />
                )}

                {activeSectionIndex < sections.length - 1 ? (
                  <button
                    onClick={() => setActiveSectionIndex((prev) => prev + 1)}
                    className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200 text-sm"
                  >
                    Next <FaChevronRight />
                  </button>
                ) : (
                  <div className="w-[100px]" />
                )}
              </div>
            </div>

            {/* Active Form Section */}
            <div className="mt-4 space-y-5">
              {activeSection === "personal" && (
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
              )}

              {activeSection === "summary" && (
                <ProfessionalSummary
                  data={resumeData.professional_summary}
                  onChange={(data) =>
                    setResumeData((prev) => ({ ...prev, professional_summary: data }))
                  }
                />
              )}

              {activeSection === "experience" && (
                <ExperienceForm
                  data={resumeData.experience}
                  onChange={(data) => setResumeData((prev) => ({ ...prev, experience: data }))}
                />
              )}

              {/* Add other sections similarly */}
              {/* {activeSection === "skills" && (
                <p className="text-gray-500 italic">Skills form goes here</p>
              )}
              {activeSection === "education" && (
                <p className="text-gray-500 italic">Education form goes here</p>
              )}
              {activeSection === "projects" && (
                <p className="text-gray-500 italic">Projects form goes here</p>
              )} */}
            </div>
          </div>
        </div>

        {/* Right: Live Preview */}
        <div className="bg-gray-50 rounded-3xl shadow-inner p-4 sm:p-6 md:p-8 flex items-start justify-center overflow-auto">
          <ResumePreview
            data={resumeData}
            template={resumeData.template}
            accentColor={resumeData.accent_color}
            classes="w-full max-w-[950px] mx-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default ResumeBuilder;
