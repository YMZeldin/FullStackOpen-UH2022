import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from './CreateBlogForm'

describe('<CreateBlogForm />', () => {
  
  const blog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/',
    likes: 2,
    user: {
      name: 'Yury Zeldin'
    }
  }

  const user = {
    token: '123456789ABCD',
    username: 'zeldin',
    name: 'Yury Zeldin'
  }

  const interactiveUser = userEvent.setup()
  const mockAddBlog = jest.fn()

  // =============================================================================
  test('create new blog', async () => {

    render(<CreateBlogForm createNewBlogObject={mockAddBlog} />)

    // can find by role with label, or by label
    const inputTitle = screen.getByRole('textbox', { name: 'title:' })
    // screen.debug(screen.getByRole('textbox', { name: 'title:' }))
    const inputAuthor = screen.getByLabelText('author:')
    const inputURL = screen.getByLabelText('url:')
    const createButton = screen.getByText('create')

    await interactiveUser.type(inputTitle, 'blog title (for test)')
    await interactiveUser.type(inputAuthor, 'blog author (for test)')
    await interactiveUser.type(inputURL, 'https://www.test.com')
    await interactiveUser.click(createButton)

    expect(mockAddBlog.mock.calls).toHaveLength(1)
    //screen.debug(mockAddBlog.mock.calls)
    expect(mockAddBlog.mock.calls[0][0].title).toBe('blog title (for test)')
    expect(mockAddBlog.mock.calls[0][0].author).toBe('blog author (for test)')
    expect(mockAddBlog.mock.calls[0][0].url).toBe('https://www.test.com')
    
  })
})