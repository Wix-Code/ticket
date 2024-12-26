import express from 'express'

import { deletePost } from "../controllers/auth.controller.js";
import { verify } from '../components/verifyToken.js';


const router = express.Router()

router.delete("/", verify, deletePost);

export default router