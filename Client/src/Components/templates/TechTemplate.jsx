import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

const TechTemplate = ({ data, accentColor = "#0ea5e9" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-900">
      {/* Header */}
      <header className="px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="text-sm text-gray-600">{data.professional_title}</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col gap-1 text-sm text-gray-700">
          {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
          {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
          {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
          {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
          {data.personal_info?.github && <div className="flex items-center gap-1"><Github className="w-4 h-4" />{data.personal_info.github}</div>}
          {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
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

        {/* Skills / Tech Stack */}
        {data.skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Skills / Tech Stack</h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <code key={i} className="px-2 py-1 text-sm rounded border" style={{ borderColor: accentColor }}>{s}</code>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Experience</h2>
            <div className="mt-3 space-y-4 text-sm">
              {data.experience.map((e, i) => (
                <div key={i} className="p-4 border rounded">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold">{e.position}</h3>
                      <div className="text-sm" style={{ color: accentColor }}>{e.company}</div>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  </div>
                  {e.description && <div className="mt-2 text-gray-700 whitespace-pre-line">{e.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {data.project?.length > 0 && (
          <section>
            <h2 className="text-xl font-medium">Projects</h2>
            <div className="mt-3 space-y-3">
              {data.project.map((p, i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">{p.name}</div>
                    {p.link && <a target="_blank" rel="noreferrer" href={p.link} className="text-sm underline">View</a>}
                  </div>
                  {p.description && <div className="text-sm text-gray-700 mt-2">{p.description}</div>}
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
      </div>
    </div>
  );
};

export default TechTemplate;
