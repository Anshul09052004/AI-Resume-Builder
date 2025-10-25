import { Router } from "express";
import { registerUser, loginUser, getUserById, getUserResume } from "../Controllers/User.Controller.js";
import  protect  from "../Middlewares/authMiddleware.js";
const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data",protect, getUserById);
router.get("/resumes", protect, getUserResume);


export default router;