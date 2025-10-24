import ai from '../Utils/ai.js'
import Resume from '../Models/Resume.Model.js'

const enchanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ error: "Please enter all the fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "you are an expert in resume writing Your task is to enchance the professional summary of a resume.The summary should be 2-3 sentences long that have a clear and concise overview of the candidate's skills and experience.Make it compelling and ATS friendly.and only return text no options or anything else" },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json(enhancedContent);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body
        if (!userContent) {
            return res.status(400).json({ error: "Please enter all the fields" })
        }
        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "you are an expert in resume writing Your task is to enchance the job description of a resume.The job description should be 2-3 sentences long that have a clear and concise overview of the responsibilities and archievement.Make it compelling and ATS friendly.and only return text no options or anything else" },
                {
                    role: "user",
                    content: userContent
                }
            ]
        })
        const enhancedContent = response.choices[0].message.content
        return res.status(200).json(enhancedContent);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

const uploadResume = async (req, res) => {
    const { resumeText, title } = req.body
    const userId = req.userId;
    if (!resumeText) {
        return res.status(400).json({ error: "Please enter all the fields" })
    }
    const systemPrompt = "you are an expert AI agent to extract data from resume"
    const userPrompt = `extract the following data from resume ${resumeText}

        Provide data in following JSON format with no additional text before and after:
        {
            professional_summary: {
                type: String,
            default: ""
        },
    skills: [{
        type: String
    }],
        personal_info: {
        image: { type: String, default: "" },
        full_name: { type: String, default: "" },
        profession: { type: String, default: "" },
        location: { type: String, default: "" },
        website: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        linkedin: { type: String, default: "" },
    },
    experience: [{
        company: { type: String },
        position: { type: String },
        start_date: { type: String },
        end_date: { type: String },
        is_current: { type: Boolean },
        description: { type: String },
    }],
        education: [{
            institution: { type: String },
            degree: { type: String },
            field: { type: String },
            graduation_date: { type: String },
            cgpa: { type: String }
        }],
            project: [{
                name: { type: String },
                description: { type: String },
                type: { type: String }
            }]
    }
        }`

    const response = await ai.chat.completions.create({
        model: process.env.OPENAI_MODEL,
        messages: [
            { role: "system", content: systemPrompt },
            {
                role: "user",
                content: userPrompt
            }
        ],
        response_format: {
            type: "json_object"
        }
    })
    const extractedData = response.choices[0].message.content
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.JSON({
        resumeId: newResume._id
    })
    return res.status(200).json(resume);
}
export { enchanceProfessionalSummary, enhanceJobDescription , uploadResume}