import React, { useState } from "react";
import { FaWhatsapp, FaLinkedin, FaTelegramPlane, FaEnvelope, FaCopy } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function SharePopup({ visible, onClose, shareUrl }) {
  const [copied, setCopied] = useState(false);

  if (!visible) return null;

  const encodedUrl = encodeURIComponent(shareUrl);

  const shareOptions = [
    { name: "WhatsApp", icon: <FaWhatsapp className="text-green-500 text-2xl" />, link: `https://api.whatsapp.com/send?text=${encodedUrl}` },
    { name: "Telegram", icon: <FaTelegramPlane className="text-blue-500 text-2xl" />, link: `https://t.me/share/url?url=${encodedUrl}&text=My Resume` },
    { name: "Gmail", icon: <FaEnvelope className="text-red-500 text-2xl" />, link: `mailto:?subject=My Resume&body=${encodedUrl}` },
    { name: "LinkedIn", icon: <FaLinkedin className="text-blue-700 text-2xl" />, link: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
  ];

  const copyToClipboard = () => {
    if (navigator.clipboard && window.isSecureContext) {
      // Modern API
      navigator.clipboard.writeText(shareUrl)
        .then(() => setCopied(true))
        .catch(() => alert("Failed to copy! Please copy manually."));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) setCopied(true);
        else alert("Failed to copy! Please copy manually.");
      } catch (err) {
        alert("Failed to copy! Please copy manually.");
      }
      document.body.removeChild(textArea);
    }

    // Reset copied state after 2s
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-6 w-11/12 max-w-md animate-scale-fade relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <IoMdClose className="text-xl text-gray-700" />
        </button>

        <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
          Share Resume
        </h3>
        <p className="text-gray-500 mb-5 text-sm text-center">
          Choose a platform to share your resume
        </p>

        <div className="flex flex-col gap-3 mb-4">
          {shareOptions.map((option) => (
            <a
              key={option.name}
              href={option.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 hover:bg-gray-50 transition shadow-sm"
            >
              {option.icon}
              <span className="font-medium text-gray-700">{option.name}</span>
            </a>
          ))}
        </div>

        {/* Copy Link */}
        <button
          onClick={copyToClipboard}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl px-4 py-3 hover:bg-gray-50 transition shadow-sm relative"
        >
          <FaCopy /> Copy Link
          {copied && (
            <span className="absolute -top-8 bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
              Copied!
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default SharePopup;
