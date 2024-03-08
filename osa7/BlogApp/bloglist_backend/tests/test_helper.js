const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Initial Blog',
    author: 'Author 1',
    url: 'abc.com',
    likes: 3,
  },
  {
    title: 'Hey blogger',
    author: 'Author 2',
    url: 'blog.fi',
    likes: 500,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog)
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
}
