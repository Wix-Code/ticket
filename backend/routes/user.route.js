import express from 'express'

import { login, register, getUsers, logout, resetPassword, requestPasswordReset } from "../controllers/user.controller.js";


const router = express.Router()

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/requestpasswordreset", requestPasswordReset);
router.post("/resetpassword", resetPassword);

// GET ALL PRODUCTS
router.get("/user", getUsers)

export default router