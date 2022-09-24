import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  
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

  const mockHandleRemoveBlog = jest.fn()

  // =============================================================================
  test('initial renders content', () => {

    render(<Blog blog={blog} user={user} handleRemoveBlog={mockHandleRemoveBlog} />)
    // screen.debug()

    const element1 = screen.getByText('Canonical string reduction by Edsger W. Dijkstra')
    expect(element1).toBeDefined()

    // queryBy... returns null if no element found
    const element2 = screen.queryByText('http://www.cs.utexas.edu/', {exact: false})
    expect(element2).toBeNull()

    const element3 = screen.queryByText('2')
    expect(element3).toBeNull()
  })

  // ===========================================================================
  test('content after view button click', async () => {

    render(<Blog blog={blog} user={user} handleRemoveBlog={mockHandleRemoveBlog} />)

    const interactiveUser = userEvent.setup()
    const button = screen.getByText('view')
    await interactiveUser.click(button)

    // screen.debug()

    const element1 = screen.getByText('Canonical string reduction by Edsger W. Dijkstra')
    expect(element1).toBeDefined()

    // queryBy... returns null if no element found
    const element2 = screen.queryByText('http://www.cs.utexas.edu/', {exact: false})
    expect(element2).toBeDefined()

    const element3 = screen.queryByText('2')
    expect(element3).toBeDefined()
  })

})