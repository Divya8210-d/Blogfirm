import express from 'express';
import { register, login, logout, getuser } from '../controller/user.controller.js';
import verify from '../middlewares/auth.midleware.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verify, logout);
router.get("", verify, getuser);

export default router;
