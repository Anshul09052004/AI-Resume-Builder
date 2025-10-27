import ai from '../Utils/ai.js'
import Resume from '../Models/Resume.Model.js'


const enchanceProfessionalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) {
            return res.status(400).json({ error: "Please enter all the fields" });
        }

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert in resume writing. Enhance the professional summary of a resume. The summary should be 2-3 sentences long, clear, concise, compelling, and ATS-friendly. Return only text.",
                },
                { role: "user", content: userContent },
            ],
        });

        const enhancedContent = response.choices[0].message.content;
        return res.status(200).json({ enhanceContent: enhancedContent });
    } catch (error) {
        console.error("Error in enchanceProfessionalSummary:", error);
        return res.status(500).json({ error: error.message });
    }
};


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
        return res.status(200).json({ enhanceContent: enhancedContent });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

export { enchanceProfessionalSummary, enhanceJobDescription }