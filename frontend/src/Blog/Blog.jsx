import React from 'react'
import './blog.css'
import Latest from '../Blog_Component/Latest'
import BlogCard from '../Blog_Component/BlogCard'
import BlogHero from '../Blog_Component/BlogHero'

const Blog = () => {
  return (
    <div className='blog'>
      <BlogHero />
      <Latest />
    </div>
  )
}

export default Blog