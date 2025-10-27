import { Router } from "express";
import { enchanceProfessionalSummary, enhanceJobDescription } from "../Controllers/Ai.Controller.js"; 
import protect from "../Middlewares/authMiddleware.js";


const router = Router();

router.post('/enhance-pro-sum',protect, enchanceProfessionalSummary)
router.post('/enhance-job-desc', protect, enhanceJobDescription)

export default router