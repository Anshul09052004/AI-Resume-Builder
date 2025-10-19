import React from "react";
import { FaRegUser, FaPhone, FaLinkedin, FaBriefcase } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { IoLocationSharp } from "react-icons/io5";
import { BsGlobe } from "react-icons/bs";

function PersonalInfoForm({ data, onChange, removeBackground, setRemoveBackground }) {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const fields = [
    { Key: "fullName", label: "Full Name", icon: FaRegUser, type: "text", required: true },
    { Key: "email", label: "Email Address", icon: HiOutlineMail, type: "email", required: true },
    { Key: "phone", label: "Phone Number", icon: FaPhone, type: "tel", required: true },
    { Key: "location", label: "Location", icon: IoLocationSharp, type: "text", required: true },
    { Key: "website", label: "Personal Website", icon: BsGlobe, type: "url", required: true },
    { Key: "linkedin", label: "Linkedin", icon: FaLinkedin, type: "url", required: true },
    { Key: "profession", label: "Profession", icon: FaBriefcase, type: "text", required: true },
  ];

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-3xl shadow-lg transition-colors duration-300">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Personal Information</h3>
        <p className="text-gray-500 text-sm">Get started with your personal details</p>
      </div>

      {/* Image Upload */}
      <label className="cursor-pointer w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-dashed border-gray-300 hover:border-green-600 transition-all flex items-center justify-center bg-gray-50">
        {data.image ? (
          <img
            src={typeof data.image === "string" ? data.image : URL.createObjectURL(data.image)}
            alt="User"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 text-sm">
            <FaRegUser className="text-3xl mb-2" />
            Upload Image
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg, image/png"
          hidden
          onChange={(e) => handleChange("image", e.target.files[0])}
        />
      </label>

      {/* Remove Background Toggle */}
      {typeof data.image === "object" && (
        <div className="mb-6 text-center">
          <p className="text-gray-700 mb-2 font-medium">Remove Background</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={removeBackground}
              onChange={() => setRemoveBackground((prev) => !prev)}
            />
            <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:bg-green-600 transition-all"></div>
            <span className="absolute left-1 top-1 bg-white w-5 h-5 rounded-full peer-checked:translate-x-7 transition-transform shadow-sm"></span>
          </label>
        </div>
      )}

      {/* Personal Info Fields */}
      <div className="space-y-5">
        {fields.map((field) => {
          const Icon = field.icon;
          return (
            <div key={field.Key} className="flex flex-col">
              <label className="flex items-center gap-2 text-gray-700 mb-1 font-medium">
                <Icon className="text-gray-500" />
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              <input
                type={field.type}
                value={data[field.Key] || ""}
                onChange={(e) => handleChange(field.Key, e.target.value)}
                placeholder={`Enter your ${field.label}`}
                required={field.required}
                className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 transition-all"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PersonalInfoForm;
