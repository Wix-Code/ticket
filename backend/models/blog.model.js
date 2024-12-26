import mongoose from 'mongoose';


const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  minutes: { type: String, required: true },
  image: { type: String, required: true },
}, {
  timestamps: true // created at, updated at
})

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;