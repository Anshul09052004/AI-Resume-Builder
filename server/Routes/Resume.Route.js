import { Router } from "express";
import { createResume, deleteResume, getResumeById, getPublicResumeById, updateResume } from "../Controllers/Resume.Controller.js";
import upload from "../Utils/Multer.js";

const router = Router();

router.post('/create', createResume)
router.delete('/delete/:resumeId', deleteResume)
router.get('/get/:resumeId', getResumeById)
router.get('/public/:resumeId', getPublicResumeById)
router.put('/update', upload.single('image'), updateResume)


export default router;