import { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

// blog = {title, author, url, likes}
// user = {token, username, name}
const Blog = ({ blog, user, handleUpdateLikes, handleRemoveBlog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const viewDetails = () => {
    setShowDetails(!showDetails)
    // console.log(showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} by {blog.author}
        {showDetails ?
          <button onClick={viewDetails} type="submit">hide</button> :
          <button onClick={viewDetails} type="submit">view</button>
        }
      </div>
      <div>
        {showDetails ?
          <div>
            <div>{blog.url}</div>
            <div>likes {blog.likes}
              <button onClick={handleUpdateLikes} value={blog.id} type="submit">like</button>
            </div>
            <div>{blog.user.name}</div>
            <div>
              {user.name === blog.user.name ?
                <button className='actionButton' onClick={handleRemoveBlog} value={blog.id} type="submit">remove</button> :
                null
              }
            </div>
          </div> :
          null
        }
      </div>
    </div>
  )}

// check property types ========================================================
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleRemoveBlog: PropTypes.func.isRequired
}

export default Blog