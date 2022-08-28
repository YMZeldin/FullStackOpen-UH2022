import React from 'react'

// form for add a new blog =====================================================
// handle name input with handleNameChange function
// handle phone number input with handleNumberChange function
// use addBlog function for "create" button
const CreateBlogForm = ({ newBlogTitle, handleNewBlogTitleChange,
  newBlogAuthor, handleNewBlogAuthorChange,
  newBlogUrl, handleNewBlogUrlChange, addBlog }) => {
  return(
    <form>
      <div> title: <input value={newBlogTitle} onChange={handleNewBlogTitleChange} /></div>
      <div> author: <input value={newBlogAuthor} onChange={handleNewBlogAuthorChange} /></div>
      <div> url: <input value={newBlogUrl} onChange={handleNewBlogUrlChange} /></div>
      <button onClick={addBlog} type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm
