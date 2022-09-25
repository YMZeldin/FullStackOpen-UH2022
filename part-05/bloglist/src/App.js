import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import './index.css'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  // useState ==================================================================
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', style: 'notification' })

  const newBlogFormRef = useRef()

  // useEffect =================================================================
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      })
    // console.log(blogs)
  }, [])

  // ===========================================================================
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // user = {token, username, name}
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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

  // ===========================================================================
  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const  errorMessage='Login error: wrong credentials'
      showNotification(errorMessage, 'error')
    }
  }

  // ===========================================================================
  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  // ===========================================================================
  const addBlog = (newBlogObject) => {

    newBlogFormRef.current.toggleVisibility()
    blogService
      .create(newBlogObject)
      .then(returnedBlog => {
        // console.log(returnedBlog)
        // blog added has 0 likes, add to the end of array, sort not needed
        setBlogs(blogs.concat(returnedBlog))
        showNotification(`a new blog ${newBlogObject.title} was added to blog list`, 'notification')
      })
      .catch(error => {
        // alert(`Error when adding ${newBlogObject.title} to the database`)
        const errorMessage=`Error when adding ${newBlogObject.title} to the blog list!\n${error.response.data.error}`
        showNotification(errorMessage, 'error')
      })
  }

  // handle function for update likes button in Blog component =================
  const handleUpdateLikes = (event) => {
    event.preventDefault()
    // event.target.value is blog id, long string in MongoDB
    const blogToUpdate = blogs.find(blog => blog.id === String(event.target.value))

    const newBlogObject = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 1
    }

    blogService
      .update(blogToUpdate.id, newBlogObject)
      .then(returnedBlog => {
        //console.log(returnedBlog)
        const newBlogs = blogs.map(blog => blog.id === blogToUpdate.id ? returnedBlog : blog)
        //console.log(newBlogs)
        setBlogs(newBlogs)
      })
      .catch(error => {
        const errorMessage=`Error when updating likes for ${newBlogObject.title}. \n${error.response.data.error}`
        showNotification(errorMessage, 'error')
        // console.log(errorMessage)
      })
  }

  // handle function for blog remove button in Blog component ==================
  const handleRemoveBlog = (event) => {
    event.preventDefault()
    // event.target.value is blog id, long string in MongoDB
    const blogToDelete = blogs.find(blog => blog.id === String(event.target.value))

    if (window.confirm(`Delete ${blogToDelete.title} by ${blogToDelete.author} ?`)) {
      blogService
        .remove(blogToDelete.id)
        .then( () => {
          setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))
          showNotification(`${blogToDelete.title} was deleted from the database`, 'notification')
        })
        .catch(error => {
          const  errorMessage=`Error when deleting ${blogToDelete.title} from the database!\n${error.response.data.error}`
          showNotification(errorMessage, 'error')
        })
    }
  }

  // ===========================================================================
  return (
    <div>
      <h1>blog list</h1>
      <Notification notification={notification} />
      {user === null ?
        <Togglable buttonLabel='login, please'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable> :
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in
              <button type="submit">logout</button>
            </p>
          </form>
          <Togglable buttonLabel='create new blog' ref={newBlogFormRef}>
            <CreateBlogForm createNewBlogObject={addBlog} />
          </Togglable>

          {blogs.map(blog => <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleUpdateLikes={handleUpdateLikes}
            handleRemoveBlog={handleRemoveBlog} />)}
        </div>
      }
    </div>
  )
}

export default App
