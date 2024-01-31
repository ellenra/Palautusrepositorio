import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './index.css'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('log in', username)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      dispatch(setNotification('Successfully logged in!', 'goodnotification'))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password!', 'error'))
    }
  }

  const handleLogout = async (event) => {
    console.log('log out', username)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    dispatch(setNotification('Logged out!', 'good'))
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      console.log('addind new blog...', title, author, url)
      const blogToAdd = await blogService
        .create({ title, author, url })
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
          <BlogForm
            handleNewBlog={handleNewBlog}
          />
          <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              id='username'
              type="text"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
          password
            <input
              id='password'
              type="text"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id="login-button" type="submit">Login</button>
        </form>

      </div>
    )
  }

  return (
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="/users">users</Link>
        <Link to="/blogs">blogs</Link>
      </div>
      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<App />} />
      </Routes>
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in </p>
        <button id="logout-button" onClick={handleLogout}>logout</button>
        <p></p>
        {blogForm()}
        {sortedBlogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
        )}
      </div>
    </Router>
  )

}

export default App