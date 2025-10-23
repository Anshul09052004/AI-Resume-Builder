import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const PortfolioTemplate = ({ data, accentColor = "#f97316" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800">
      {/* Header */}
      <header className="px-8 py-6 border-b-2 mb-6" style={{ borderColor: accentColor }}>
        <h1 className="text-3xl font-bold" style={{ color: accentColor }}>
          {data.personal_info?.full_name || "Your Name"}
        </h1>
        <p className="text-sm text-gray-700 mt-1">{data.professional_title}</p>

        <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
          {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" style={{ color: accentColor }} />{data.personal_info.email}</div>}
          {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" style={{ color: accentColor }} />{data.personal_info.phone}</div>}
          {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" style={{ color: accentColor }} />{data.personal_info.location}</div>}
          {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" style={{ color: accentColor }} />{data.personal_info.linkedin}</div>}
          {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" style={{ color: accentColor }} />{data.personal_info.website}</div>}
        </div>
      </header>

      <div className="px-8 pb-10 space-y-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Projects</h2>
            <ul className="space-y-3">
              {data.project.map((p, i) => (
                <li key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                  <h3 className="font-semibold text-gray-800">{p.name}</h3>
                  {p.description && <p className="text-gray-700 mt-1">{p.description}</p>}
                  {p.tags?.length > 0 && <p className="text-xs mt-1" style={{ color: accentColor }}>{p.tags.slice(0, 2).join(", ")}</p>}
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="text-sm underline mt-1 block">View</a>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Experience</h2>
            <div className="space-y-3 text-sm">
              {data.experience.map((e, i) => (
                <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
                  <div className="font-medium">{e.position} at <span style={{ color: accentColor }}>{e.company}</span></div>
                  <div className="text-xs text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  {e.description && <p className="text-gray-700 mt-1 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Education</h2>
            <div className="space-y-2 text-sm">
              {data.education.map((ed, i) => (
                <div key={i} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
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
            <h2 className="text-xl font-semibold mb-2" style={{ color: accentColor }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded font-medium" style={{ backgroundColor: accentColor, color: "#fff", border: `1px solid ${accentColor}` }}>{s}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioTemplate;
