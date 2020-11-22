import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({render, createBlog}) => {
  const {setError, setErrorMessage} = render

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setError(false)
    setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
    setErrorMessage(null)
   }, 5000)
  }
  
  
    
    return(
      <div className="formDiv">
      <form onSubmit={addBlog}>
        <h2>Create Blog</h2>
        <div>
        <label htmlFor="title">title</label>
        <input
        type="text"
        value={newBlog.title}
        id="title"
        name="title"
        onChange={(event) => setNewBlog({...newBlog, title: event.target.value})}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
        type="text"
        value={newBlog.author}
        id="author"
        name="author"
        onChange={(event) => setNewBlog({...newBlog, author: event.target.value})}
        />
      </div>
      <div>
        <label htmlFor="URL">url</label>
        <input
        type="text"
        value={newBlog.url}
        id="URL"
        name="url"
        onChange={(event) => setNewBlog({...newBlog, url: event.target.value})}
        />
      </div>
      <button type="submit">create</button>
      </form>
      </div>
    )
  }

  

export default BlogForm
