import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

const MinimalTemplate = ({ data, accentColor = "#06b6d4" }) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const [year, month] = dateStr.split("-");
        return new Date(year, month - 1).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short"
        });
    };

    return (
        <div className="max-w-4xl mx-auto p-8 bg-white text-gray-900 font-light shadow-md rounded-md">
            {/* Header */}
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-bold tracking-wide" style={{ color: accentColor }}>
                    {data.personal_info?.full_name || "Your Name"}
                </h1>
                <p className="text-lg text-gray-600 mt-1">{data.personal_info?.profession || data.professional_title}</p>

                <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-gray-700">
                    {data.personal_info?.email && <div className="flex items-center gap-1"><Mail className="w-4 h-4" />{data.personal_info.email}</div>}
                    {data.personal_info?.phone && <div className="flex items-center gap-1"><Phone className="w-4 h-4" />{data.personal_info.phone}</div>}
                    {data.personal_info?.location && <div className="flex items-center gap-1"><MapPin className="w-4 h-4" />{data.personal_info.location}</div>}
                    {data.personal_info?.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-4 h-4" />{data.personal_info.linkedin}</div>}
                    {data.personal_info?.website && <div className="flex items-center gap-1"><Globe className="w-4 h-4" />{data.personal_info.website}</div>}
                </div>
            </header>

            {/* Professional Summary */}
            {data.professional_summary && (
                <section className="mb-10">
                    <h2 className="text-sm font-semibold tracking-widest mb-2" style={{ color: accentColor }}>Summary</h2>
                    <p className="text-gray-700 leading-relaxed">{data.professional_summary}</p>
                </section>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }}>Experience</h2>
                    <div className="space-y-6">
                        {data.experience.map((exp, index) => (
                            <div key={index} className="border-l-2 pl-4 border-gray-300">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-lg font-medium">{exp.position}</h3>
                                    <span className="text-sm text-gray-500">{formatDate(exp.start_date)} - {exp.is_current ? "Present" : formatDate(exp.end_date)}</span>
                                </div>
                                <p className="text-gray-600 mb-1">{exp.company}</p>
                                {exp.description && <p className="text-gray-700 leading-relaxed whitespace-pre-line">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {data.project && data.project.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }}>Projects</h2>
                    <div className="space-y-4">
                        {data.project.map((proj, index) => (
                            <div key={index} className="border-l-2 pl-4 border-gray-300">
                                <h3 className="text-lg font-medium">{proj.name}</h3>
                                {proj.description && <p className="text-gray-700 mt-1">{proj.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section className="mb-10">
                    <h2 className="text-sm font-semibold tracking-widest mb-4" style={{ color: accentColor }}>Education</h2>
                    <div className="space-y-4">
                        {data.education.map((edu, index) => (
                            <div key={index} className="border-l-2 pl-4 border-gray-300 flex justify-between items-baseline">
                                <div>
                                    <h3 className="font-medium">{edu.degree} {edu.field && `in ${edu.field}`}</h3>
                                    <p className="text-gray-600">{edu.institution}</p>
                                    {edu.gpa && <p className="text-sm text-gray-500">GPA: {edu.gpa}</p>}
                                </div>
                                <span className="text-sm text-gray-500">{formatDate(edu.graduation_date)}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-semibold tracking-widest mb-3" style={{ color: accentColor }}>Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {data.skills.map((s, i) => (
                            <span key={i} className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: accentColor, color: "black" }}>{s}</span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default MinimalTemplate;
