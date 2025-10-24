import { Router } from "express";
import { enchanceProfessionalSummary, enhanceJobDescription, uploadResume } from "../Controllers/Ai.Controller.js"; 


const router = Router();

router.post('/enhance-pro-sum', enchanceProfessionalSummary)
router.post('/enhance-job-desc', enhanceJobDescription)
router.post('/upload-resume', uploadResume)


export default router