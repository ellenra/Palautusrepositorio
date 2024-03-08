import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('Test if blogform works correctly', async () => {
  const user = userEvent.setup()
  const handleNewBlog = jest.fn()

  render(<BlogForm handleNewBlog={handleNewBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')
  const sendButton = screen.getByText('create')

  await user.type(title, 'hey')
  await user.type(author, 'heyy')
  await user.type(url, 'hi.com')
  await user.click(sendButton)

  expect(handleNewBlog.mock.calls).toHaveLength(1)
  expect(handleNewBlog.mock.calls[0][0]).toEqual({
    title: 'hey',
    author: 'heyy',
    url: 'hi.com',
  })
})
