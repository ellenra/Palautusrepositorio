import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../index.css'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showBlog, setShowBlog] = useState(false)
  const hideWhenVisible = { display: showBlog ? 'none' : '' }
  const showWhenVisible = { display: showBlog ? '' : 'none' }
  const blogStyle = {
    paddingTop: 8,
    paddingLeft: 5,
    paddingBottom: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLikeToBlog = () => {
    const updatedBlog = {
      id: blog.id,
      likes: blog.likes + 1,
    }
    console.log('updating blog', updatedBlog)
    updateBlog(updatedBlog)
  }

  const delBlog = () => {
    if (window.confirm('Do you want to delete this blog?')) {
      console.log('deleting blog', blog)
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideWhenVisible} className='blogView'>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <button onClick={() => setShowBlog(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={() => addLikeToBlog()}>like</button>
        </div>
        <div>{blog.user ? blog.user.name : ''}</div>
        <div>
          {blog.user && blog.user.username === user.username && (
            <button onClick={() => delBlog()}>delete</button>
          )}
        </div>
        <button onClick={() => setShowBlog(false)}>hide</button>
      </div>
    </div>
  )
}

export default Blog
