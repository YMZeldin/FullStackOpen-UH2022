import { useState } from 'react'
import PropTypes from 'prop-types'

// form for add a new blog =====================================================
// use addBlog function for "create" button
const CreateBlogForm = ({ createNewBlogObject }) => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    createNewBlogObject({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={addNewBlog}>
      <div> title:
        <input value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
      </div>
      <div> author:
        <input value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
      </div>
      <div> url:
        <input value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

// check property types ========================================================
CreateBlogForm.propTypes = {
  createNewBlogObject: PropTypes.func.isRequired
}

export default CreateBlogForm
