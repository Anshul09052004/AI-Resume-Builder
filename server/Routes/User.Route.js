import { Router } from "express";
import { registerUser, loginUser, getUserById, getUserResume } from "../Controllers/User.Controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/data", getUserById);
router.get("/resumes", getUserResume);


export default router;