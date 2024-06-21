import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewSkill, deleteSkill, getAllSkill, updateSkill } from "../controllers/skill.controllers.js";

const router = express.Router();

router.post("/add", isAuthenticated, 
addNewSkill);

router.post("/update/:id", isAuthenticated, updateSkill)

router.get("/getall", getAllSkill);

router.delete("/delete/:id", isAuthenticated, deleteSkill);

export default router;
