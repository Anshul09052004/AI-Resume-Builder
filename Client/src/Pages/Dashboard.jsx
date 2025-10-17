import { CiCirclePlus } from "react-icons/ci";
import { RiUploadCloudLine } from "react-icons/ri";
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react";
import { LuFilePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";

function Dashboard() {
  const [allResumes, setAllResumes] = useState([]);

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-white transition-colors p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Welcome, Joe Doe
          </h1>
          <p className="text-gray-500 mb-6">Manage your resumes below</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-medium">
              <CiCirclePlus className="text-xl" />
              Create Resume
            </button>
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-medium">
              <RiUploadCloudLine className="text-xl" />
              Upload Resume
            </button>
          </div>
        </div>

        <hr className="border-gray-300 mb-10" />

        {/* Resume List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allResumes.map((resume, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all flex flex-col justify-between hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-6">
                <LuFilePen className="text-indigo-500 text-4xl" />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-800 text-lg">{resume.title}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated on {new Date(resume.updatedAt).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-5 mt-4">
                <button className="text-red-500 hover:text-red-600 transition-all">
                  <MdDelete className="text-2xl" />
                </button>
                <button className="text-indigo-500 hover:text-indigo-600 transition-all">
                  <FaPen className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
