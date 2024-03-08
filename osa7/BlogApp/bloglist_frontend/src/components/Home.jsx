import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import '../index.css'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const Home = ({ user }) => {
  const [blogs, setBlogs] = useState([])
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      console.log('addind new blog...', title, author, url)
      const blogToAdd = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blogToAdd))
      console.log('blog added')
      dispatch(setNotification('New blog added!', 'goodnotification'))
    } catch {
      dispatch(setNotification('Could not add a new blog!', 'error'))
    }
  }

  const updateBlog = async (blog) => {
    console.log(blog)
    try {
      await blogService.update(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      dispatch(setNotification('Liked a blog!', 'goodnotification'))
    } catch (exception) {
      console.error('error:', exception)
      dispatch(setNotification('Could not update blog.', 'error'))
    }
  }

  const deleteBlog = async (blog) => {
    console.log(blog)
    try {
      await blogService.deleteBlog(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      dispatch(setNotification('Blog deleted!', 'goodnotification'))
    } catch (exception) {
      console.error('error:', exception)
      dispatch(setNotification('Could not delete blog.', 'error'))
    }
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  const blogForm = () => {
    const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setAddBlogVisible(true)}>new note</button>
        </div>
        <div style={{ margin: '10px 0' }}></div>
        <div style={showWhenVisible}>
          <BlogForm handleNewBlog={handleNewBlog} />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <p></p>
      {blogForm()}
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

export default Home
