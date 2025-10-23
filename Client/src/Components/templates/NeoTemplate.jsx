import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const NeoTemplate = ({ data, accentColor = "#7c3aed" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="px-8 py-6 border-b-2 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-4xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-700 mt-1">{data.professional_title}</p>

        {/* Contact Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4" style={{ color: accentColor }} />
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4" style={{ color: accentColor }} />
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" style={{ color: accentColor }} />
              {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" style={{ color: accentColor }} />
              {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4" style={{ color: accentColor }} />
              {data.personal_info.website}
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left / Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Professional Summary */}
          {data.professional_summary && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                Experience
              </h2>
              <div className="space-y-4">
                {data.experience.map((e, i) => (
                  <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 className="font-semibold text-gray-900">{e.position}</h3>
                        <p className="text-gray-700 font-medium">{e.company}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}
                      </div>
                    </div>
                    {e.description && (
                      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {e.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                Projects
              </h2>
              <ul className="space-y-3">
                {data.project.map((p, i) => (
                  <li key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                    <h3 className="font-semibold text-gray-800">{p.name}</h3>
                    {p.description && <p className="text-gray-700">{p.description}</p>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold mb-3" style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-3">
                {data.education.map((ed, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {ed.degree} {ed.field && `in ${ed.field}`}
                      </h3>
                      <p className="text-gray-700">{ed.institution}</p>
                      {ed.gpa && <p className="text-sm text-gray-600">GPA: {ed.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-600">{formatDate(ed.graduation_date)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Skills */}
        <aside>
          {data.skills?.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm rounded font-medium"
                    style={{ backgroundColor: accentColor, color: "black", border: `1px solid ${accentColor}` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default NeoTemplate;
