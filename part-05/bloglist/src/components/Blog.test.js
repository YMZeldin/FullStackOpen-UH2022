import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
//import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  // =============================================================================
  test('initial renders content', () => {
    const blog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/',
      likes: 2
    }

    const user = {
      token: '123456789ABCD',
      username: 'zeldin',
      name: 'Yury Zeldin'
    }

    const mockHandleRemoveBlog = jest.fn()

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

})