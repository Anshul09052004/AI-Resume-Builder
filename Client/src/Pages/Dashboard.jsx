import { CiCirclePlus } from "react-icons/ci";
import { RiUploadCloudLine } from "react-icons/ri";
import { dummyResumeData } from "../assets/assets";
import { useEffect, useState } from "react";
import { LuFilePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");
  const createResume = async (event) => {
    event.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`)

  }
  const uploadResume = async (event) => {
    event.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/res123`)
  }
  const editTitle = async (event) => {
    event.preventDefault();
  }

  const deleteResume = async (resumeId) => {
    const confirm = window.confirm("Are you sure you want to delete this resume?");
    if (confirm) {
      setAllResumes(prev => prev.filter(resume => resume._id !== resumeId))
    }
  }

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
            <button onClick={() => setShowCreateResume(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-medium">
              <CiCirclePlus className="text-xl" />
              Create Resume
            </button>
            <button onClick={() => setShowUploadResume(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all font-medium">
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
              onClick={() => navigate(`/app/builder/${resume._id}`)}
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
              <div onClick={e => e.stopPropagation()} className="flex justify-end gap-5 mt-4">
                <button className="text-red-500 hover:text-red-600 transition-all">
                  <MdDelete onClick={() => deleteResume(resume._id)} className="text-2xl" />
                </button>
                <button className="text-indigo-500 hover:text-indigo-600 transition-all">
                  <FaPen onClick={() => { setEditResumeId(resume._id); setTitle(resume.title) }} className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {
          showCreateResume && (
            <div
              onClick={() => setShowCreateResume(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <form
                onSubmit={createResume}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative transition-all duration-300"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateResume(false);
                    setTitle('');
                  }}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <RxCross1 size={22} />
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100 mb-6">
                  Create Resume
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-5 border border-zinc-300 dark:border-zinc-700 rounded-lg 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none 
                     dark:bg-zinc-800 dark:text-zinc-100 placeholder-zinc-400 transition"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium 
                     rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Create Resume
                </button>
              </form>
            </div>
          )
        }
        {
          showUploadResume && (
            <div
              onClick={() => setShowUploadResume(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <form
                onSubmit={uploadResume}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative transition-all duration-300"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadResume(false);
                    setTitle('');
                  }}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <RxCross1 size={22} />
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100 mb-6">
                  Upload Resume
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-5 border border-zinc-300 dark:border-zinc-700 rounded-lg 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none 
                     dark:bg-zinc-800 dark:text-zinc-100 placeholder-zinc-400 transition"
                />
                <div
                  className="w-full border-2 border-dashed border-indigo-400 dark:border-indigo-600 
             rounded-2xl p-6 flex flex-col items-center justify-center gap-3 
             text-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-zinc-800 
             transition-all duration-300"
                >
                  <label htmlFor="resume-input" className="cursor-pointer w-full flex flex-col items-center">
                    <span className="text-gray-700 dark:text-gray-300 font-medium text-base mb-2">
                      Select Resume File
                    </span>

                    {resume ? (
                      <p className="text-indigo-600 dark:text-indigo-400 font-semibold truncate max-w-[200px]">
                        {resume.name}
                      </p>
                    ) : (
                      <>
                        <LuFilePen className="text-4xl text-indigo-500 mb-1" />
                        <p className="text-gray-500 dark:text-gray-400 text-sm">Upload Resume</p>
                      </>
                    )}

                    {/* Hidden File Input */}
                    <input
                      id="resume-input"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setResume(e.target.files[0])}
                      className="hidden"
                    />
                  </label>
                </div>


                {/* Submit Button */}
                <button
                  type="submit"
                  className="mt-5 w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium 
                     rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Upload Resume
                </button>
              </form>
            </div>
          )
        }
        {
          editResumeId && (
            <div
              onClick={() => setEditResumeId('')}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
            >
              <form
                onSubmit={editTitle}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-8 w-[90%] max-w-md relative transition-all duration-300"
              >
                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEditResumeId('');
                    setTitle('');
                  }}
                  className="absolute top-3 right-3 text-zinc-500 hover:text-red-500 transition-colors"
                >
                  <RxCross1 size={22} />
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center text-zinc-800 dark:text-zinc-100 mb-6">
                  Edit resume Title
                </h2>

                {/* Input */}
                <input
                  type="text"
                  placeholder="Enter Resume Title"
                  className="w-full px-4 py-2 mb-5 border border-zinc-300 dark:border-zinc-700 rounded-lg 
                     focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none 
                     dark:bg-zinc-800 dark:text-zinc-100 placeholder-zinc-400 transition"
                />

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium 
                     rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                >
                  Update
                </button>
              </form>
            </div>
          )
        }


      </div>
    </div>
  );
}

export default Dashboard;
