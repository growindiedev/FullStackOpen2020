import React, {useState} from 'react'

const BlogForm = ({render}) => {
  const {blogService, setError, setErrorMessage} = render

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  const addBlog = (event) => {
    event.preventDefault()
    blogService.create(newBlog)
    setError(false)
    setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
  
  
    
    return(
      <form onSubmit={addBlog}>
        <h2>Create Blog</h2>
        <div>
        title:
        <input
        type="text"
        value={newBlog.title}
        name="title"
        onChange={(event) => setNewBlog({...newBlog, title: event.target.value})}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value={newBlog.author}
        name="author"
        onChange={(event) => setNewBlog({...newBlog, author: event.target.value})}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value={newBlog.url}
        name="url"
        onChange={(event) => setNewBlog({...newBlog, url: event.target.value})}
        />
      </div>
      <button type="submit">create</button>
      </form>
    )
  }

export default BlogForm
