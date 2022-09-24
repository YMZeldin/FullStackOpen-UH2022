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
      <label htmlFor='title'>title: </label>
      <input type='text' id='title' value={newBlogTitle} onChange={({ target }) => setNewBlogTitle(target.value)} />
      <br></br>
      <label htmlFor='author'>author: </label>
      <input type='text' id='author' value={newBlogAuthor} onChange={({ target }) => setNewBlogAuthor(target.value)} />
      <br></br>
      <label htmlFor='url'>url: </label>
      <input type='url' id='url' value={newBlogUrl} onChange={({ target }) => setNewBlogUrl(target.value)} />
      <br></br>
      <button type="submit">create</button>
    </form>
  )
}

// check property types ========================================================
CreateBlogForm.propTypes = {
  createNewBlogObject: PropTypes.func.isRequired
}

export default CreateBlogForm
