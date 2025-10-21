import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor = "#06b6d4" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800 grid grid-cols-1 md:grid-cols-3">
      {/* Sidebar */}
      <aside className="md:col-span-1 p-6" style={{ backgroundColor: accentColor, color: "#fff" }}>
        <div className="text-center">
          <h1 className="text-2xl font-semibold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="text-sm mt-1">{data.personal_info?.profession || data.professional_title}</p>
        </div>

        <div className="mt-6 space-y-3 text-sm">
          {data.personal_info?.email && <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
          {data.personal_info?.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
          {data.personal_info?.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
          {data.personal_info?.linkedin && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
          {data.personal_info?.website && <div className="flex items-center gap-2"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
        </div>

        {data.skills?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold">Skills</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="px-2 py-1 text-xs rounded" style={{ background: "rgba(255,255,255,0.15)" }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="md:col-span-2 p-8">
        {/* Professional Summary */}
        {data.professional_summary && (
          <section>
            <h2 className="text-xl font-medium">Professional Summary</h2>
            <p className="mt-2 text-gray-700">{data.professional_summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-medium">Experience</h2>
            <div className="mt-3 space-y-4">
              {data.experience.map((e, idx) => (
                <div key={idx} className="p-4 border rounded">
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
          <section className="mt-6">
            <h2 className="text-xl font-medium">Projects</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-4">
              {data.project.map((p, i) => (
                <div key={i} className="p-3 border rounded">
                  <div className="font-semibold">{p.name}</div>
                  {p.description && <div className="text-sm text-gray-700 mt-1">{p.description}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education?.length > 0 && (
          <section className="mt-6">
            <h2 className="text-xl font-medium">Education</h2>
            <div className="mt-3 space-y-4">
              {data.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                  <p style={{ color: accentColor }}>{edu.institution}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{formatDate(edu.graduation_date)}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CreativeTemplate;
