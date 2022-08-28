import { useState } from 'react'

const Blog = ({ blog }) => {

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
    console.log(showDetails)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
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
              <button type="submit">like</button>
            </div>
            <div>{blog.user.name}</div>
          </div> :
          null
        }
      </div>
    </div>
  )}

export default Blog