import { useState } from 'react'

const BlogForm = ({ handleNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlog = async (event) => {
    event.preventDefault()
    console.log('adding new blog')
    handleNewBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={newBlog}>
        <div>
            title:
          <input
            id='title'
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
            author:
          <input
            id='author'
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </div>
        <div>
            url:
          <input
            id='url'
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
          />
        </div>
        <button id='newblog-button' type="submit">create</button>
      </form>
    </div>
  )

}

export default BlogForm