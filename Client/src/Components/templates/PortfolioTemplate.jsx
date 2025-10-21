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
      <header className="px-8 py-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-semibold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="text-sm text-gray-600">{data.professional_title}</p>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
            {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
            {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
            {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
            {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
            {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
          </div>
        </div>
      </header>

      <div className="px-8 pb-10 space-y-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <h2 className="text-xl font-medium">Professional Summary</h2>
            <p className="mt-2 text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Selected Projects</h2>
            <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {data.project.map((p, i) => (
                <div key={i} className="border rounded overflow-hidden">
                  {p.thumbnail && <img src={typeof p.thumbnail === "string" ? p.thumbnail : ""} alt={p.name} className="w-full h-36 object-cover" />}
                  <div className="p-3">
                    <div className="font-semibold">{p.name}</div>
                    {p.description && <div className="text-sm text-gray-700 mt-1">{p.description}</div>}
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div style={{ color: accentColor }}>{p.tags?.slice(0,2).join(", ")}</div>
                      {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="underline">View</a>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Experience</h2>
            <div className="mt-3 space-y-3 text-sm">
              {data.experience.map((e, i) => (
                <div key={i}>
                  <div className="font-medium">{e.position} at <span style={{ color: accentColor }}>{e.company}</span></div>
                  <div className="text-xs text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  {e.description && <div className="mt-1 text-gray-700 whitespace-pre-line">{e.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Education</h2>
            <div className="mt-3 space-y-2 text-sm">
              {data.education.map((ed, i) => (
                <div key={i}>
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
            <h2 className="text-xl font-medium">Skills</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s, i) => <span key={i} className="px-2 py-1 text-xs rounded border" style={{ borderColor: accentColor }}>{s}</span>)}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default PortfolioTemplate;
