import { useState, useEffect } from "react"
import { useParams} from 'react-router-dom'
import userService from "../services/users"

const User = () => {
  const [user, setUser] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    userService.getById(id).then((user) => setUser(user))
  }, [id])

  if (!user) {
    return null
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <strong>added blogs</strong>
      <ul>
      {user.blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
      </ul>
    </div>
  )
}

export default User
