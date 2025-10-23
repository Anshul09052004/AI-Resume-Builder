import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import ResumePreview from "../Components/ResumePreview";
import Loader from "../Components/Loader"; 
import { GoArrowLeft } from "react-icons/go";


function Preview() {
    const { resumeId } = useParams();
    const [resumeData, setResumeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadResume = async () => {
        const foundResume = dummyResumeData.find((resume) => resume._id === resumeId);
        setResumeData(foundResume || null);
        setIsLoading(false);
    };

    useEffect(() => {
        loadResume();
    }, []);

    return (
        <>
            {isLoading ? (
                // 🔵 Loading State
                <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
                    <Loader />
                    <p className="mt-4 text-gray-600 text-lg font-medium">
                        Loading your resume...
                    </p>
                </div>
            ) : resumeData ? (
                // ✅ Resume Preview Section
                <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                    <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6">
                        <ResumePreview
                            data={resumeData}
                            template={resumeData.template}
                            accentColor={resumeData.accent_color}
                        />
                    </div>
                </div>
            ) : (
                // ❌ Resume Not Found
                <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="bg-white shadow-lg rounded-2xl px-8 py-10 text-center max-w-md border border-gray-200">
                        <p className="text-gray-800 text-2xl font-semibold mb-3">
                            Resume Not Found
                        </p>
                        <p className="text-gray-500 mb-8 text-base">
                            We couldn’t find the resume you’re looking for.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300"
                        >
                            <GoArrowLeft className="text-lg" />
                            <span className="font-medium">Go to Home Page</span>
                        </a>
                    </div>
                </div>

            )}
        </>
    );
}

export default Preview;
