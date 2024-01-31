const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')

const initialUsers = [
  {
      username: 'testaaja',
      name: 'testaaja123'
  }
]

const initialTestUsers = async() => {
  const saltRounds = 10
  await User.deleteMany({})
  initialUsers[0].passwordHash = await bcrypt.hash('Pepe', saltRounds)
  let userObject = new User(initialUsers[0])
  await userObject.save()
}

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are --- blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

test('id is defined', async() => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('a blog can be added with valid token', async () => {
    const newBlog = {
      title: 'Best blog ever',
      author: 'Ellen',
      url: 'ellen.com',
      likes: 10000
    }

    const login = await api.post('/api/login').send({ username: 'testaaja', password: 'testaaja123' })
    const token = login.body.token

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const updatedBlogs = await Blog.find({})
    expect(updatedBlogs.length).toBe(helper.initialBlogs.length + 1)
  
    const titles = updatedBlogs.map(r => r.title)
    expect(titles).toContain(
      'Best blog ever'
    )
  })

test('a blog can be deleted', async() => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/notes/:${blogToDelete._id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
    )

    const titles = blogsAtEnd.map(r = r.title)
    expect(titles).not.toContain(blogToDelete.title)

})

test('if likes empty return 0', async () => {
    const newBlog = {
        title: 'Bad blog',
        author: 'Kirjoittaja',
        url: 'badblog.com'
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const noLikesBlog = response.body.find(blog => 
        blog.title === 'Bad blog'
    )
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(noLikesBlog.likes).toEqual(0)
})

test('blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate._id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toEqual(blogToUpdate.likes)
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'oellen',
      name: 'Olivia Ellen',
      password: 'salaisuus',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})