import { Router } from "express";
import { createResume, deleteResume, getResumeById, getPublicResumeById, updateResume, editTitle } from "../Controllers/Resume.Controller.js";
import upload from "../Utils/Multer.js";
import protect from "../Middlewares/authMiddleware.js";

const router = Router();

router.post('/create' ,protect, createResume)
router.delete('/delete/:resumeId',protect, deleteResume)
router.get('/get/:resumeId', protect, getResumeById)
router.get('/public/:resumeId', getPublicResumeById)
router.put('/update/:resumeId', protect, updateResume);
router.put('/edit-title' ,protect, editTitle)



export default router;