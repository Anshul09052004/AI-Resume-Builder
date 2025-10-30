import { FaRegUser, FaLinkedin, FaBriefcase } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";

function PersonalInfoForm({ data, onChange, removeBackground, setRemoveBackground }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const fields = [
    { Key: "full_name", label: "Full Name", icon: FaRegUser, type: "text", required: true },
    { Key: "email", label: "Email Address", icon: HiOutlineMail, type: "email", required: true },
    { Key: "phone", label: "Phone Number", icon: FaPhone, type: "tel", required: true },
    { Key: "location", label: "Location", icon: IoLocationSharp, type: "text", required: true },
    { Key: "website", label: "Personal Website URL", icon: BsGlobe, type: "url", required: true },
    { Key: "linkedin", label: "LinkedIn URL", icon: FaLinkedin, type: "url", required: true },
    { Key: "profession", label: "Profession", icon: FaBriefcase, type: "text", required: true },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-br from-white via-indigo-50 to-blue-50 rounded-3xl shadow-xl border border-indigo-100 transition-all duration-300 hover:shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Personal Information
        </h3>
        <p className="text-gray-500 mt-1 text-sm">
          Fill out your basic personal details below
        </p>
      </div>

      {/* Personal Info Fields */}
      <div className="space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.Key} className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-700 font-semibold mb-1">
                <Icon className="text-indigo-500" />
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.Key] || ""}
                onChange={(e) => handleChange(field.Key, e.target.value)}
                placeholder={`Enter your ${field.label}`}
                required={field.required}
                className="px-4 py-3 border border-gray-200 rounded-2xl bg-white/70 text-gray-800 placeholder-gray-400 
                  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-400 transition-all duration-200
                  hover:border-indigo-300"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInfoForm;
