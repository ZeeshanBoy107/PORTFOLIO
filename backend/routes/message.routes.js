import express from 'express';
import { deleteMessage, getAllMessages, sendMessage } from '../controllers/message.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';


const router = express.Router();

router.post("/send", sendMessage);

router.get("/getall", isAuthenticated, getAllMessages);

router.delete("/delete/:id", isAuthenticated, deleteMessage)

export default router;