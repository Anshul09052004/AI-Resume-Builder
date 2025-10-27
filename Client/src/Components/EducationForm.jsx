import { CiCirclePlus } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa6";

function EducationForm({ data, onChange }) {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      cgpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="bg-gray-50 rounded-2xl shadow-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-blue-600 bg-clip-text text-transparent">
            Professional Education
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Add your academic qualifications
          </p>
        </div>
        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-blue-600 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl shadow-md font-medium transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <CiCirclePlus className="w-5 h-5" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 && (
        <div className="flex flex-col items-center gap-3 text-gray-500 mt-6">
          <FaGraduationCap className="w-10 h-10 text-gray-400" />
          <p className="font-medium text-center">
            No education details added yet.
          </p>
          <p className="text-sm text-center">
            Click the button above to add your education details.
          </p>
        </div>
      )}

      {/* Education List */}
      {data.map((education, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl p-5 space-y-4 bg-white shadow-sm hover:shadow-lg transition-all duration-300"
        >
          {/* Title + Remove */}
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-semibold text-gray-700">
              🎓 Education #{index + 1}
            </h4>
            <button
              onClick={() => removeEducation(index)}
              className="text-red-500 hover:text-red-600 transition-colors"
              title="Remove Education"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>

          {/* Input Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="col-span-2">
              <input
                type="text"
                placeholder="Institution Name"
                value={education.institution || ""}
                onChange={(e) =>
                  updateEducation(index, "institution", e.target.value)
                }
                className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <input
              type="text"
              placeholder="Degree (e.g. B.Tech, M.Tech, etc.)"
              value={education.degree || ""}
              onChange={(e) => {
                const input = e.target.value;
                const capitalized = input.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                updateEducation(index, "degree", capitalized);
              }}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 capitalize"
            />

            <input
              type="text"
              placeholder="Field of Study"
              value={education.field || ""}
              onChange={(e) => {
                const input = e.target.value;
                const capitalized = input.replace(/\b\w/g, (char) =>
                  char.toUpperCase()
                );
                updateEducation(index, "field", capitalized);
              }}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 capitalize"
            />

            <input
              type="month"
              value={education.graduation_date || ""}
              onChange={(e) =>
                updateEducation(index, "graduation_date", e.target.value)
              }
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <input
              type="text"
              placeholder="CGPA or Percentage"
              value={education.cgpa || ""}
              onChange={(e) =>
                updateEducation(index, "cgpa", e.target.value)
              }
              className="w-full p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationForm;
