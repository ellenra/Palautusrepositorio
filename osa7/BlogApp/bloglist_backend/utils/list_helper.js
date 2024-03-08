const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map((blog) => blog.likes)
  const mostLiked = blogs[likes.indexOf(Math.max(...likes))]
  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

const mostBlogs = (blogs) => {
  const blogDict = {}
  blogs.forEach((blog) => {
    if (blog.author in blogDict) {
      blogDict[blog.author] += 1
    } else {
      blogDict[blog.author] = 1
    }
  })
  const blogAuthor = Object.keys(blogDict).reduce((a, b) =>
    blogDict[a] > blogDict[b] ? a : b
  )
  return {
    author: blogAuthor,
    blogs: blogDict[blogAuthor],
  }
}

const mostLikes = (blogs) => {
  const blogDict = {}
  blogs.forEach((blog) => {
    if (blog.author in blogDict) {
      blogDict[blog.author] += blog.likes
    } else {
      blogDict[blog.author] = blog.likes
    }
  })
  const blogAuthor = Object.keys(blogDict).reduce((a, b) =>
    blogDict[a] > blogDict[b] ? a : b
  )
  return {
    author: blogAuthor,
    likes: blogDict[blogAuthor],
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
