import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const ElegantTemplate = ({ data, accentColor = "#C084FC" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="px-10 py-8" style={{ background: "#fff8fb" }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif" style={{ color: accentColor }}>{data.personal_info?.full_name || "Your Name"}</h1>
            <p className="italic text-gray-600 mt-1">{data.professional_title}</p>
          </div>
          <div className="text-left sm:text-right text-sm space-y-1">
            {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span>{data.personal_info.email}</span></div>}
            {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{data.personal_info.phone}</span></div>}
            {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{data.personal_info.location}</span></div>}
            {data.personal_info?.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" /><span>{data.personal_info.linkedin}</span></div>}
            {data.personal_info?.website && <div className="flex items-center gap-2"><Globe className="w-4 h-4" /><span>{data.personal_info.website}</span></div>}
          </div>
        </div>
      </header>

      <div className="p-10 space-y-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section className="rounded-lg p-4 shadow-sm" style={{ background: "#fff" }}>
            <h2 className="text-2xl font-light mb-2" style={{ borderBottom: `2px solid ${accentColor}` }}>Professional Summary</h2>
            <p className="text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-4">Experience</h2>
            <div className="space-y-5">
              {data.experience.map((e, i) => (
                <div key={i} className="p-4 rounded-md border">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold">{e.position}</h3>
                      <div className="text-sm" style={{ color: accentColor }}>{e.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  </div>
                  {e.description && <p className="mt-3 text-gray-700 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-2xl font-light mb-4">Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {data.project.map((p, i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="font-semibold">{p.name}</div>
                  {p.description && <div className="text-sm text-gray-700 mt-1">{p.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {/* Education */}
          {data.education?.length > 0 && (
            <section>
              <h2 className="text-xl font-medium" style={{ color: accentColor }}>Education</h2>
              <div className="mt-3 space-y-3">
                {data.education.map((ed, idx) => (
                  <div key={idx} className="text-sm">
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
              <h2 className="text-xl font-medium" style={{ color: accentColor }}>Skills</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded-full border" style={{ borderColor: accentColor }}>{s}</span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
