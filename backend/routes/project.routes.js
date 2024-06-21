import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewProject, deleteProject, getAllProject, getOneProject, updateProject } from "../controllers/project.controllers.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewProject);

router.post("/update/:id", isAuthenticated, updateProject);

router.get("/getall", getAllProject);

router.delete("/delete/:id", isAuthenticated, deleteProject);

router.get("/get/:id", getOneProject)

export default router;
