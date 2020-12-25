import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setErrorMessage} from '../reducers/errorMessageReducer'
import {setTitle, setAuthor, setUrl} from '../reducers/blogFormReducer'
import {createBlog} from '../reducers/blogsReducer'

import {setError} from '../reducers/errorReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const {title, author, url} = useSelector(state => state.blogFormReducer)

  const addBlog = () => {
    //event.preventDefault()
    const newBlog = {title, author, url}
    dispatch(createBlog(newBlog))
    dispatch(setError(false))
    dispatch(setErrorMessage(`a new blog ${title} by ${author} added`))

    setTimeout(() => {
    dispatch(setErrorMessage(null))
   }, 5000)
  }

  const blogStyle = {
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    margin: 10 
  }
  
  
    
    return(
      <div className="formDiv" style={blogStyle}>
      <form onSubmit={addBlog}>
        <h2>Create Blog</h2>
        <div>
        <label htmlFor="title">title</label>
        <input
        type="text"
        value={title}
        id="title"
        name="title"
        onChange={(event) => dispatch(setTitle(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
        type="text"
        value={author}
        id="author"
        name="author"
        onChange={(event) => dispatch(setAuthor(event.target.value))}
        />
      </div>
      <div>
        <label htmlFor="URL">url</label>
        <input
        type="text"
        value={url}
        id="URL"
        name="url"
        onChange={(event) => dispatch(setUrl(event.target.value))}
        />
      </div>
      <button type="submit" className="submit">create</button>
      </form>
      </div>
    )
  }

  

export default BlogForm
