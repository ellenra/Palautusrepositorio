import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Testing',
    author: 'testaaja',
    url: 'test.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  const element = screen.queryAllByText('Testing')
  expect(element.length).toBeGreaterThan(0)

  const author = screen.getByText('testaaja')
  expect(author).toBeDefined()
})

test('renders all info when view button is clicked', async () => {
  const blog = {
    title: 'Testing',
    author: 'testaaja',
    url: 'test.com',
    likes: 10,
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const element = screen.queryAllByText('Testing')
  expect(element).toBeDefined()
  const author = screen.getByText('testaaja')
  expect(author).toBeDefined()
  const url = screen.getByText('test.com')
  expect(url).toBeDefined()
  const likes = screen.getByText(10)
  expect(likes).toBeDefined
})

test('like button pressed two times works', async () => {
  const blog = {
    title: 'Testing',
    author: 'testaaja',
    url: 'test.com',
    likes: 10,
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} updateBlog={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
