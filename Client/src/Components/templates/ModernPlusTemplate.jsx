import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernPlusTemplate = ({ data, accentColor = "#7c3aed" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="px-8 py-6 mb-6 border-b-4" style={{ borderColor: accentColor }}>
        <h1 className="text-4xl font-semibold mb-1 text-black">
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        {data.professional_title && (
          <p className="text-sm text-gray-700">{data.professional_title}</p>
        )}

        {/* Contact Info */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1">
              <Mail className="w-4 h-4 text-gray-700" />
              {data.personal_info.email}
            </div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1">
              <Phone className="w-4 h-4 text-gray-700" />
              {data.personal_info.phone}
            </div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-gray-700" />
              {data.personal_info.location}
            </div>
          )}
          {data.personal_info?.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="w-4 h-4 text-gray-700" />
              {data.personal_info.linkedin}
            </div>
          )}
          {data.personal_info?.website && (
            <div className="flex items-center gap-1">
              <Globe className="w-4 h-4 text-gray-700" />
              {data.personal_info.website}
            </div>
          )}
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-medium mb-2" style={{ color: accentColor }}>
              Professional Summary
            </h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: accentColor }}>
              Experience
            </h2>
            <div className="space-y-4">
              {data.experience.map((e, i) => (
                <div
                  key={i}
                  className="p-4 rounded-lg border-l-4"
                  style={{ borderLeftColor: accentColor }}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{e.position}</h3>
                      <div className="text-sm font-medium" style={{ color: accentColor }}>
                        {e.company}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}
                    </div>
                  </div>
                  {e.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">{e.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium mb-3" style={{ color: accentColor }}>
              Projects
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.project.map((p, i) => (
                <div key={i} className="p-4 rounded-lg border border-gray-200">
                  <div className="font-semibold" style={{ color: accentColor }}>
                    {p.name}
                  </div>
                  {p.description && <div className="text-gray-700 mt-1">{p.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-medium mb-2" style={{ color: accentColor }}>
                Education
              </h2>
              <div className="space-y-3 text-sm">
                {data.education.map((ed, idx) => (
                  <div key={idx}>
                    <div className="font-semibold">{ed.degree} {ed.field && `in ${ed.field}`}</div>
                    <div className="font-medium" style={{ color: accentColor }}>{ed.institution}</div>
                    <div className="text-xs text-gray-500">
                      {formatDate(ed.graduation_date)}
                      {ed.gpa ? ` • GPA: ${ed.gpa}` : ""}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-medium mb-2" style={{ color: accentColor }}>
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm rounded font-medium"
                    style={{
                      backgroundColor: accentColor,
                      color: "black",
                      border: `1px solid ${accentColor}`,
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernPlusTemplate;
