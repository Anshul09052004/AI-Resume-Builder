import Resume from "../Models/Resume.Model.js";
const createResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const newResume = await Resume.create({ userId, title });
    return res.status(200).json({ resume: newResume });

  } catch (error) {
    console.error("❌ Create Resume Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });
    return res.status(200).json({ message: "Resume deleted successfully" });

  } catch (error) {
    console.error("❌ Delete Resume Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findById(resumeId);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({ resume });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ _id: resumeId });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    return res.status(200).json(resume);

  } catch (error) {
    console.error("❌ Get Public Resume Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

const updateResume = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const { resumeData } = req.body;

    if (!resumeId) {
      return res.status(400).json({ message: "Resume ID is required" });
    }

    const parsedData =
      typeof resumeData === "string" ? JSON.parse(resumeData) : resumeData;
    delete parsedData._id;

    const resume = await Resume.findByIdAndUpdate(
      resumeId,
      parsedData,
      { new: true, runValidators: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "✅ Resume updated successfully",
      resume,
    });
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ message: error.message });
  }
};
const editTitle = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData } = req.body;

    if (!resumeId || !resumeData) {
      return res.status(400).json({ error: "Missing resumeId or resumeData" });
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      resumeData,
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    return res.status(200).json(updatedResume);

  } catch (error) {
    console.error("❌ Edit Title Error:", error);
    return res.status(500).json({ error: error.message });
  }
};


export {
  createResume,
  deleteResume,
  getResumeById,
  getPublicResumeById,
  updateResume,
  editTitle
};
