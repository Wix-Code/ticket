import mongoose from "mongoose";
import Blog from "../models/blog.model.js";



export const createPost = async (req,res) => {
  const post = req.body;
  const posts = Blog(post);
  try {
    await posts.save();
    res.status(200).json({success : true, data: posts});
  } catch (error) {
    console.error("Error in posting products");
  }
}

export const deletePost = async (req,res) => {
   try {
    
   } catch (error) {
    
   }
}

export const getPosts = async (req,res) => {
   try {
    const getAll = await Blog.find().sort({createdAt: - 1});
    res.status(200).json({success : true, data: getAll});
   } catch (error) {
    console.error("Error in getting posts");
   }
}

export const updatePost = async (req,res) => {

}