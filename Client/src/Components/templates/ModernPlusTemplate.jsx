import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ModernPlusTemplate = ({ data, accentColor = "#7c3aed" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="px-8 py-8 rounded-b-2xl" style={{ background: `linear-gradient(90deg, ${accentColor}, #06b6d4)` }}>
        <h1 className="text-4xl font-semibold text-white">{data.personal_info?.full_name || "Your Name"}</h1>
        <p className="text-sm text-white/90 mt-1">{data.professional_title}</p>
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/90">
          {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
          {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
          {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
          {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
          {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
        </div>
      </header>

      <div className="p-8 space-y-6">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="p-4 rounded-lg shadow-sm border">
            <h2 className="text-xl font-medium">Professional Summary</h2>
            <p className="mt-2 text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium mb-3">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((e, i) => (
                <div key={i} className="p-4 rounded-lg border-l-4" style={{ borderLeftColor: accentColor }}>
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{e.position}</h3>
                      <div className="text-sm" style={{ color: accentColor }}>{e.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  </div>
                  {e.description && <p className="mt-2 text-gray-700 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium mb-3">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.project.map((p, i) => (
                <div key={i} className="p-4 rounded-lg border">
                  <div className="font-semibold">{p.name}</div>
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
              <h2 className="text-xl font-medium mb-2">Education</h2>
              <div className="space-y-3 text-sm">
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

          {/* Skills */}
          {data.skills?.length > 0 && (
            <section>
              <h2 className="text-xl font-medium mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => <span key={i} className="px-2 py-1 text-sm rounded" style={{ backgroundColor: accentColor, color: "#fff" }}>{s}</span>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernPlusTemplate;
