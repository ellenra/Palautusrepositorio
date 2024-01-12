import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import './index.css'

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='error'>
      {message}
    </div>
  )
}

const GoodNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='good'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [goodMessage, setGoodMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

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
      setGoodMessage('Successfully logged in!')
      setTimeout(() => {
        setGoodMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    console.log('log out', username)
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    setGoodMessage('Logged out!')
    setTimeout(() => {
      setGoodMessage(null)
    }, 5000)
  }

  const handleNewBlog = async ({ title, author, url }) => {
    try {
      console.log('addind new blog...', title, author, url)
      const blogToAdd = await blogService
        .create({ title, author, url })
      setBlogs(blogs.concat(blogToAdd))
      console.log('blog added')
      setAddBlogVisible(false)
      setGoodMessage('New blog added!')
      setTimeout(() => {
        setGoodMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('Could not add a new blog!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    console.log(blog)
    try {
      await blogService.update(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (exception) {
      console.error('error:', exception)
      setErrorMessage('Could not update blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (blog) => {
    console.log(blog)
    try {
      await blogService.deleteBlog(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setGoodMessage('Blog deleted!')
      setTimeout(() => {
        setGoodMessage(null)
      }, 5000)
    } catch (exception) {
      console.error('error:', exception)
      setErrorMessage('Could not delete blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <ErrorNotification message={errorMessage} />
        <GoodNotification message={goodMessage} />
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
    <div>
      <h2>blogs</h2>
      <GoodNotification message={goodMessage} />
      <ErrorNotification message={errorMessage} />
      <p>{user.name} logged in </p>
      <button id="logout-button" onClick={handleLogout}>logout</button>
      <p></p>
      {blogForm()}
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )

}

export default App