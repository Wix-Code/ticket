import express from 'express'

import { getPosts, createPost, deletePost } from "../controllers/blog.controller.js";


const router = express.Router()

// POSTING PRODUCTS
router.post("/", createPost);

// DELETING PRODUCTS
router.delete("/:id", deletePost);

// GET ALL PRODUCTS
router.get("/", getPosts)

export default router