import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { 
  addNewApplication,
  deleteApplication,
  getAllApplication 
} from "../controllers/application.controllers.js";

const router = express.Router();

router.post("/add", isAuthenticated,addNewApplication);

router.get("/getall",  getAllApplication);

router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;
