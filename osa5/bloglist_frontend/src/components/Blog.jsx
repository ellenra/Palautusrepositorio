import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showBlog, setShowBlog] = useState(false)
  const hideWhenVisible = { display: showBlog ? 'none' : '' }
  const showWhenVisible = { display: showBlog ? '' : 'none' }

  const addLikeToBlog = () => {
    const updatedBlog = {
      id: blog.id,
      likes: blog.likes+1,
    }
    console.log('updating blog', updatedBlog)
    updateBlog(updatedBlog)
  }

  const delBlog = () => {
    if(window.confirm('Do you want to delete this blog?')){
      console.log('deleting blog', blog)
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title}
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
        <div>{blog.user ? blog.user.name: ''}</div>
        <div>
          {(blog.user && blog.user.username === user.username) &&<button onClick={() => delBlog()}>delete</button>}
        </div>
        <button onClick={() => setShowBlog(false)}>hide</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
