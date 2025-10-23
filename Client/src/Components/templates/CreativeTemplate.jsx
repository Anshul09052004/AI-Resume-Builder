import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const CreativeTemplate = ({ data, accentColor = "#7c3aed" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white text-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-3">

        {/* Sidebar */}
        <aside className="md:col-span-1 p-6 border-r border-gray-300">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-semibold" style={{ color: accentColor }}>
              {data.personal_info?.full_name || "Your Name"}
            </h1>
            <p className="text-sm text-gray-700 mt-1">
              {data.personal_info?.profession || data.professional_title}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            {data.personal_info?.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: accentColor }} />
                <span>{data.personal_info.email}</span>
              </div>
            )}
            {data.personal_info?.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: accentColor }} />
                <span>{data.personal_info.phone}</span>
              </div>
            )}
            {data.personal_info?.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: accentColor }} />
                <span>{data.personal_info.location}</span>
              </div>
            )}
            {data.personal_info?.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4" style={{ color: accentColor }} />
                <span>{data.personal_info.linkedin}</span>
              </div>
            )}
            {data.personal_info?.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: accentColor }} />
                <span>{data.personal_info.website}</span>
              </div>
            )}
          </div>

          {data.skills?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2" style={{ color: accentColor }}>
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs rounded font-medium"
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
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="md:col-span-2 p-8">
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
                {data.experience.map((e, idx) => (
                  <div key={idx} className="border-l-3 pl-4" style={{ borderColor: accentColor }}>
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
                {data.education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700">{edu.institution}</p>
                      {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-sm text-gray-600">{formatDate(edu.graduation_date)}</div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default CreativeTemplate;
