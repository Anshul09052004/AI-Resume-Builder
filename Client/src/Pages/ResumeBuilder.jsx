import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import PersonalInfoForm from "../Components/PersonalInfoForm";
import ProfessionalSummary from "../Components/ProfessionalSummary";
import ExperienceForm from "../Components/ExperienceForm";
import EducationForm from "../Components/EducationForm";
import ProjectForm from "../Components/ProjectForm";
import SkillsForm from "../Components/SkillsForm";
import TemplateSection from "../Components/TemplateSection";
import ColorPicker from "../Components/ColorPicker";
import ResumePreview from "../Components/ResumePreview";


import { FaArrowLeft, FaUserTie, FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { GoEye, GoEyeClosed, GoDownload } from "react-icons/go";

function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    skills: [],
    education: [],
    project: [],
    template: "classic",
    accent_color: "#3b82F6",
    public: false,
  });

  const { resumeId } = useParams();
  const [removeBackground, setRemoveBackground] = useState(false);
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const sections = ["personal", "summary", "skills", "experience", "education", "projects"];
  const activeSection = sections[activeSectionIndex];
  const [showSharePopup, setShowSharePopup] = useState(false);

  useEffect(() => {
    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) setResumeData(resume);
  }, [resumeId]);

  const changeResumeVisibility = () => {
    setResumeData((prev) => ({ ...prev, public: !prev.public }));
  };

const downloadResume = () => {
  const resumeElement = document.getElementById("resume-preview");
  if (!resumeElement) return;

  const printContents = resumeElement.innerHTML;
  const accentColor = resumeData.accent_color;

  // Save current body
  const originalContents = document.body.innerHTML;

  // Replace body content temporarily
  document.body.innerHTML = `
    <html>
      <head>
        <title>${resumeData.title || "My Resume"}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@3.3.2/dist/tailwind.min.css" rel="stylesheet">
        <style>
          body {
            font-family: system-ui, sans-serif;
            background: #fff;
            padding: 40px;
            display: flex;
            justify-content: center;
          }

          /* Accent color styles */
          [data-accent] { color: ${accentColor} !important; }
          [data-border-accent] { border-color: ${accentColor} !important; }
          [data-bg-accent] { background-color: ${accentColor} !important; }

          /* Force black text for personal info & skills */
          [data-accent], [data-border-accent], [data-bg-accent] {
            color: #000 !important; /* text black */
          }
        </style>
      </head>
      <body>
        <div class="resume-container" style="max-width:950px; width:100%; background:white; border-radius:16px; box-shadow:0 4px 20px rgba(0,0,0,0.08); overflow:hidden;">
          ${printContents}
        </div>
      </body>
    </html>
  `;

  window.print();

  // Restore old content
  document.body.innerHTML = originalContents;
  window.location.reload();
};



  const handleShare = async () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Resume",
          text: "Check out my resume!",
          url: resumeUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
        setShowSharePopup(true); // fallback for mobile/desktop
      }
    } else {
      setShowSharePopup(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 max-w-7xl mx-auto">
        <Link to="/app">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-md">
            <FaArrowLeft className="text-sm" /> Back to Dashboard
          </button>
        </Link>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10 max-w-7xl mx-auto">
        {/* Left: Form */}
        <div className="bg-white rounded-3xl shadow-lg p-6 flex flex-col justify-between h-full space-y-5">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUserTie />
            {activeSection === "personal"
              ? "Personal Information"
              : activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h2>

          {/* Template + Color */}
          <div className="flex gap-3 flex-wrap">
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

          {/* Previous / Next */}
          <div className="flex justify-between mt-2">
            {activeSectionIndex > 0 ? (
              <button
                onClick={() => setActiveSectionIndex((prev) => prev - 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm transition"
              >
                <FaChevronLeft /> Previous
              </button>
            ) : <div className="w-[100px]" />}
            {activeSectionIndex < sections.length - 1 ? (
              <button
                onClick={() => setActiveSectionIndex((prev) => prev + 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition"
              >
                Next <FaChevronRight />
              </button>
            ) : <div className="w-[100px]" />}
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
            {activeSection === "education" && (
              <EducationForm
                data={resumeData.education}
                onChange={(data) => setResumeData((prev) => ({ ...prev, education: data }))}
              />
            )}
            {activeSection === "projects" && (
              <ProjectForm
                data={resumeData.project}
                onChange={(data) => setResumeData((prev) => ({ ...prev, project: data }))}
              />
            )}
            {activeSection === "skills" && (
              <SkillsForm
                data={resumeData.skills}
                onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))}
              />
            )}
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 ease-in-out">
            Save Changes
          </button>
        </div>

        {/* Right: Preview + Buttons */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap justify-end gap-2">
            {resumeData.public && (
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                <IoShareSocial /> Share
              </button>
            )}
            <button
              onClick={changeResumeVisibility}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
            >
              {resumeData.public ? <GoEye /> : <GoEyeClosed />}
              {resumeData.public ? "Public" : "Private"}
            </button>
            <button
              onClick={downloadResume}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
            >
              <GoDownload /> Download
            </button>
          </div>

          <div
            id="resume-preview"
            className="bg-gray-50 rounded-3xl shadow-xl p-4 sm:p-6 md:p-8 flex justify-center items-start w-full overflow-auto h-[70vh] sm:h-[calc(100vh-120px)] transition-all duration-300 ease-in-out"
          >
            <div className="w-full max-w-[950px] mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-white overflow-hidden">
              <ResumePreview
                data={resumeData}
                template={resumeData.template}
                accentColor={resumeData.accent_color}
                classes="w-full"
              />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}

export default ResumeBuilder;
