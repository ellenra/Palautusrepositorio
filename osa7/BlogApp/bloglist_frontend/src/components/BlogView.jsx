import { useState, useEffect } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import userService from '../services/users'

const BlogView = ({ user }) => {
  const [blog, setBlog] = useState(null)
  const { id } = useParams()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getById(id).then((blog) => setBlog(blog))
  }, [id])

  if (!blog) {
    return null
  }

  console.log(blog)

  const updateBlog = async (blog) => {
    console.log(blog)
    try {
      await blogService.update(blog)
      setBlog(blog)
      dispatch(setNotification('Liked a blog!', 'goodnotification'))
    } catch (exception) {
      console.error('error:', exception)
      dispatch(setNotification('Could not like blog.', 'error'))
    }
  }

  const addLikeToBlog = () => {
    const updatedBlog = {
      id: blog.id,
      likes: blog.likes + 1,
    }
    console.log('updating blog', updatedBlog)
    updateBlog(updatedBlog)
  }


  return (
    <div>
      <h2>{blog.title}</h2>
      <div>Author: {blog.author}</div>
      <div>Url: {blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={() => addLikeToBlog()}>like</button>
      </div>
      <div>{blog.user.name}</div>
    </div>
  )
}

export default BlogView
