import Resume from "../Models/Resume.Model.js";
import imagekit from "../Utils/imagekit.js";
import fs from "fs";

const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body;
        const newResume = await Resume.create({ userId, title });
        return res.status(200).json(newResume);
    } catch (error) {

        return res.status(500).json({ error: error.message });

    }
}
const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        await Resume.findOneAndDelete({ userId, _id: resumeId });
        return res.status(200).json({ message: "Resume deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ userId, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ error: "Resume not found" });
        }
        resume._v = undefined
        resume.createdAt = undefined
        resume.updatedAt = undefined
        return res.status(200).json(resume);


    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(404).json({ error: "Resume not found" });
        }
        return res.status(200).json(resume);
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
const updateResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId, resumeData, removeBackground } = req.body;
        const image = req.file;
        if (image) {
            const imageBufferData = fs.createReadStream(image.path);
            const response = await imagekit.files.upload({
                file: imageBufferData,
                fileName: 'resume.png',
                folder: "user_resumes",
                transformations: [
                    { height: 300, width: 300, focus: "face", quality: 0.75 },
                    ...(removeBackground ? [{ effect: "bgremove" }] : [])
                ]
            });
            resumeDataCopy.personal_image = response.url
        }
        let resumeDataCopy = JSON.parse(JSON.parse(resumeData));

        const resume = await Resume.findOneAndUpdate(
            { _id: resumeId, userId: userId },
            resumeDataCopy,
            { new: true }
        );

        return res.status(200).json(resume);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export { createResume, deleteResume, getResumeById, getPublicResumeById, updateResume }