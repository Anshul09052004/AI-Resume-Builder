import { Mail, Phone, MapPin } from "lucide-react";

const CorporateTemplate = ({ data, accentColor = "#1f2937" }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return new Date(year, month - 1).toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 shadow-sm rounded-lg">
      <header className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: `4px solid ${accentColor}` }}>
        <div>
          <h1 className="text-3xl font-bold">{data.personal_info?.full_name || "Your Name"}</h1>
          <p className="text-sm text-gray-600">{data.personal_info?.profession || "Your Profession"}</p>
        </div>
        <div className="text-sm text-gray-700 flex flex-col gap-1">
          {data.personal_info?.email && (
            <div className="flex items-center gap-1"><Mail size={16} /> {data.personal_info.email}</div>
          )}
          {data.personal_info?.phone && (
            <div className="flex items-center gap-1"><Phone size={16} /> {data.personal_info.phone}</div>
          )}
          {data.personal_info?.location && (
            <div className="flex items-center gap-1"><MapPin size={16} /> {data.personal_info.location}</div>
          )}
        </div>
      </header>

      <div className="px-8 py-8">
        {data.experience?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold">Professional Experience</h2>
            <div className="mt-4 space-y-4">
              {data.experience.map((e, i) => (
                <div key={i} className="p-4 border rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{e.position}</h3>
                      <p className="text-sm" style={{ color: accentColor }}>{e.company}</p>
                    </div>
                    <div className="text-sm text-gray-500">{formatDate(e.start_date)} - {e.is_current ? "Present" : formatDate(e.end_date)}</div>
                  </div>
                  {e.description && <p className="mt-3 text-gray-700 whitespace-pre-line">{e.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="grid sm:grid-cols-2 gap-6">
          {data.education?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Education</h3>
              <div className="mt-3 space-y-3">
                {data.education.map((ed, idx) => (
                  <div key={idx}>
                    <div className="font-medium">{ed.degree}</div>
                    <div style={{ color: accentColor }}>{ed.institution}</div>
                    <div className="text-xs text-gray-500">{formatDate(ed.graduation_date)}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {data.skills?.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold">Key Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {data.skills.map((s, i) => (
                  <span key={i} className="px-3 py-1 text-sm rounded" style={{ backgroundColor: accentColor, color: "black" }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CorporateTemplate;
