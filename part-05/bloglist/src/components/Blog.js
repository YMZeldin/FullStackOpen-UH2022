import { useState } from 'react'
import blogService from '../services/blogs'
import Notification from '../components/Notification'
import PropTypes from 'prop-types'

// blog = {title, author, url, likes}
// user = {token, username, name}
const Blog = ({ blog, user, handleRemoveBlog }) => {

  const [showDetails, setShowDetails] = useState(false)
  const [currentBlog, setCurrentBlog] = useState(blog)
  const [notification, setNotification] = useState({ message: '', style: 'notification' })

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

  // ==========================================================================
  const showNotification = (message, notificationStyle ) => {
    const newNotification = {
      message: message,
      style: notificationStyle
    }
    // console.log(newNotification)
    setNotification(newNotification)
    setTimeout(() => {setNotification({ message: '', style: 'notification' })}, 5000)
  }

  // ==========================================================================
  const updateLikes = () => {
    const newBlogObject = {
      title: currentBlog.title,
      author: currentBlog.author,
      url: currentBlog.url,
      likes: currentBlog.likes + 1
    }

    blogService
      .update(currentBlog.id, newBlogObject)
      .then(returnedBlog => {
        //console.log(returnedBlog)
        setCurrentBlog(returnedBlog)
        //setBlogs(blogs.concat(returnedBlog))
        //showNotification(`a new blog ${newBlogObject.title} was added to blog list`, 'notification')
      })
      .catch(error => {
        const errorMessage=`Error when updating likes for ${newBlogObject.title}. \n${error.response.data.error}`
        showNotification(errorMessage, 'error')
        // console.log(errorMessage)
      })
  }

  return (
    <div style={blogStyle}>
      <Notification notification={notification} />
      <div>
        {currentBlog.title} by {currentBlog.author}
        {showDetails ?
          <button onClick={viewDetails} type="submit">hide</button> :
          <button onClick={viewDetails} type="submit">view</button>
        }
      </div>
      <div>
        {showDetails ?
          <div>
            <div>{currentBlog.url}</div>
            <div>likes {currentBlog.likes}
              <button onClick={updateLikes} type="submit">like</button>
            </div>
            <div>{currentBlog.user.name}</div>
            <div>
              {user.name === currentBlog.user.name ?
                <button style={{ background: 'lightpink' }} onClick={handleRemoveBlog} value={currentBlog.id} type="submit">remove</button> :
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