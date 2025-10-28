import { CiCirclePlus } from "react-icons/ci";
import { LuFilePen } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { FaPen } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../Config/Api";

function Dashboard() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");
  const [editResumeId, setEditResumeId] = useState("");

  // 🧩 Create Resume
  const createResume = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(
        "/api/v1/resumes/create",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
      toast.success("Resume created successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create resume");
    }
  };

  // 🧩 Delete Resume
  const deleteResume = async (resumeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/v1/resumes/delete/${resumeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes((prev) => prev.filter((r) => r._id !== resumeId));
      toast.success("Resume deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  // 🧩 Edit Title
  const editTitle = async (e) => {
    e.preventDefault();
    if (!title || !editResumeId) return;

    try {
      const { data } = await api.put(
        "/api/v1/resumes/edit-title",
        { resumeId: editResumeId, resumeData: { title } },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAllResumes((prev) =>
        prev.map((r) => (r._id === editResumeId ? data : r))
      );
      setTitle("");
      setEditResumeId("");
      toast.success("Title updated successfully!");
    } catch (error) {
      toast.error("Failed to update title");
    }
  };

  // 🧩 Load all resumes
  const loadAllResumes = async () => {
    try {
      const { data } = await api.get("/api/v1/user/resumes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error("Failed to load resumes");
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-8 sm:p-12 transition-all">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
         <h1
  className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-green-600 via-green-600 to-yellow-500 bg-clip-text text-transparent tracking-tight mb-3 drop-shadow-sm"
>
  Welcome, {user?.name}
</h1>

          <p className="text-gray-500 text-lg">
            Manage and craft your professional resumes beautifully.
          </p>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowCreateResume(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 font-semibold"
            >
              <CiCirclePlus className="text-2xl" />
              Create Resume
            </button>
          </div>
        </div>

        {/* Resume List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
          {allResumes.map((resume, index) => (
            <div
              key={index}
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              className="group bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-3xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all p-6 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="p-3 bg-indigo-100 rounded-2xl">
                  <LuFilePen className="text-indigo-600 text-3xl" />
                </div>
                <div>
                  <p className="text-xl font-semibold text-gray-800">
                    {resume.title || "Untitled Resume"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Updated on {new Date(resume.updatedAt).toDateString()}
                  </p>
                </div>
              </div>

              <div
                onClick={(e) => e.stopPropagation()}
                className="flex justify-end gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-all"
              >
                <button
                  onClick={() => deleteResume(resume._id)}
                  className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 transition-all"
                >
                  <MdDelete className="text-xl" />
                </button>
                <button
                  onClick={() => {
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="p-2 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-500 hover:text-indigo-600 transition-all"
                >
                  <FaPen className="text-xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Create Modal */}
        {showCreateResume && (
          <div
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <form
              onSubmit={createResume}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md relative"
            >
              <button
                type="button"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <RxCross1 size={22} />
              </button>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Create New Resume
              </h2>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter resume title"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:scale-105 transition-all"
              >
                Create Resume
              </button>
            </form>
          </div>
        )}

        {/* Edit Modal */}
        {editResumeId && (
          <div
            onClick={() => setEditResumeId("")}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <form
              onSubmit={editTitle}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl p-8 w-[90%] max-w-md relative"
            >
              <button
                type="button"
                onClick={() => {
                  setEditResumeId("");
                  setTitle("");
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
              >
                <RxCross1 size={22} />
              </button>

              <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                Edit Resume Title
              </h2>

              <input
                type="text"
                placeholder="Enter new title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none mb-6"
              />

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl font-semibold hover:scale-105 transition-all"
              >
                Update
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
