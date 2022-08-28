import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  // useState ==================================================================
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  //const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', style: 'notification' })


  // useEffect =================================================================
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs(blogs)
      })
  }, [])

  // ===========================================================================
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
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
        'loggedNoteappUser', JSON.stringify(user)
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

    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  // handle function for new blog title input ==================================
  const handleNewBlogTitleChange = (event) => {
    // console.log('handleTitleChange newTitle =', event.target.value)
    setNewBlogTitle(event.target.value)
  }

  // handle function for new blog author input =================================
  const handleNewBlogAuthorChange = (event) => {
    // console.log('handleNumberChange newNumber =', event.target.value)
    setNewBlogAuthor(event.target.value)
  }

  // handle function for new blog url input ====================================
  const handleNewBlogUrlChange = (event) => {
    // console.log('handleFiletrChange newFilter =', event.target.value)
    setNewBlogUrl(event.target.value)
  }

  // ===========================================================================
  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    blogService
      .create(newBlogObject)
      .then(returnedBlog => {
        //console.log(response)
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogUrl('')
        showNotification(`a new blog ${newBlogObject.title} was added to blog list`, 'notification')
      })
      .catch(error => {
        // alert(`Error when adding ${newBlogObject.title} to the database`)
        const errorMessage=`Error when adding ${newBlogObject.title} to the blog list!
               ${error.response.data.error}`
        showNotification(errorMessage, 'error')
        // console.log('blogService.create', errorMessage)
      })

  }

  // ===========================================================================
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  // ===========================================================================
  const blogList = () => (
    <div>
      <form onSubmit={handleLogout}>
        <p>{user.name} logged-in
          <button type="submit">logout</button>
        </p>
      </form>
      <CreateBlogForm newBlogTitle={newBlogTitle} handleNewBlogTitleChange={handleNewBlogTitleChange}
        newBlogAuthor={newBlogAuthor} handleNewBlogAuthorChange={handleNewBlogAuthorChange}
        newBlogUrl={newBlogUrl} handleNewBlogUrlChange={handleNewBlogUrlChange}
        addBlog={addBlog} />
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )

  // ===========================================================================
  return (
    <div>
      <h1>blog list</h1>
      <Notification notification={notification} />
      {user === null ?
        loginForm() :
        blogList()}
    </div>
  )
}

export default App
