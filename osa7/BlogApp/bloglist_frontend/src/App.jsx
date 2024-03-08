import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Users from './components/Users'
import './index.css'
import Home from './components/Home'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
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

  const padding = {
    padding: 5
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
              type='text'
              name='username'
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='text'
              name='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    )
}

  return (
    <Router>
      <div>
        <Link style={padding} to='/'>home</Link>
        <Link style={padding} to='/users'>users</Link>
      </div>
      <div>
      <h2>Blog App</h2>
        <Notification />
        <p>{user.name} logged in </p>
        <button id='logout-button' onClick={handleLogout}>
          logout
        </button>
      </div>
      <Routes>
        <Route path='/' element={<Home user={user} />} />
        <Route path='/users' element={<Users />} />
        <Route path='/users/:id' element={<User />}/>
        <Route path='/blogs/:id' element={<BlogView user={user}/>} />
      </Routes>
    </Router>
  )
}

export default App
