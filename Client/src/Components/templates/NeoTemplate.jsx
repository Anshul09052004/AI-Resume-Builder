import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const NeoTemplate = ({ data, accentColor = "#111827" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900">
      {/* Header */}
      <div className="px-8 py-6" style={{ backgroundColor: accentColor, color: "#fff" }}>
        <h1 className="text-4xl font-extrabold">{data.personal_info?.full_name || "Your Name"}</h1>
        <p className="text-sm mt-1">{data.professional_title}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
          {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
          {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
          {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
          {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
          {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
        </div>
      </div>

      <div className="px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Professional Summary */}
          {data.professional_summary && (
            <section>
              <h2 className="text-2xl font-bold">Professional Summary</h2>
              <p className="mt-2 text-gray-800">{data.professional_summary}</p>
            </section>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold">Experience</h2>
              <div className="mt-3 space-y-4">
                {data.experience.map((e, i) => (
                  <div key={i} className="p-3 border-l-4 rounded" style={{ borderLeftColor: accentColor }}>
                    <div className="flex justify-between">
                      <div className="font-semibold">{e.position}</div>
                      <div className="text-sm text-gray-600">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                    </div>
                    {e.description && <div className="text-sm mt-2">{e.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data.project?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold">Projects</h2>
              <div className="mt-3 space-y-3">
                {data.project.map((p, i) => (
                  <div key={i} className="p-3 border rounded">
                    <div className="font-semibold">{p.name}</div>
                    {p.description && <div className="text-gray-700 mt-1">{p.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold">Education</h2>
              <div className="mt-3 space-y-3 text-sm">
                {data.education.map((ed, idx) => (
                  <div key={idx}>
                    <div className="font-semibold">{ed.degree} {ed.field && `in ${ed.field}`}</div>
                    <div style={{ color: accentColor }}>{ed.institution}</div>
                    <div className="text-xs text-gray-500">{formatDate(ed.graduation_date)}{ed.gpa ? ` • GPA: ${ed.gpa}` : ""}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar: Skills */}
        <aside>
          {data.skills && (
            <div>
              <h3 className="font-bold">Skills</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="px-2 py-1 text-xs rounded" style={{ border: `2px solid ${accentColor}` }}>{s}</span>
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
