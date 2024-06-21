import express from 'express';
import { forgotPassword, getUser, getUserForPortfolio, login, logout, register, resetPassword, updatePassword, updateProfile } from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.get("/logout", isAuthenticated ,logout)
router.get("/getuser", isAuthenticated, getUser)
router.put("/update/profile", isAuthenticated, updateProfile)
router.put("/update/password", isAuthenticated, updatePassword)
router.get("/portfolio", getUserForPortfolio)
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:resettoken", resetPassword);


export default router;