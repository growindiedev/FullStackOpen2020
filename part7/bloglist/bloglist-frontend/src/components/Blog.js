import React from 'react'
import Togglable from './Togglable'
import {useDispatch, useSelector} from 'react-redux'
import {updateLike, removeblog} from '../reducers/blogsReducer'
import {getBlogs} from '../reducers/blogsReducer'
import {useParams} from 'react-router-dom'



const Blog = () => {
  const dispatch = useDispatch()
  const blogID = useParams().id

  const blogs = useSelector(state => state.blogsReducer)
  const blog = blogs.find(b => b.id === blogID)
  console.log('blog', blogs)

  const blogStyle = {
    padding: 15,
    border: 'solid',
    borderWidth: 1,
    margin: 10 
  }

const updateBlog = (event) => {
  event.preventDefault();
  dispatch(updateLike(blog))
}

const removeBlog = (event) => {
  event.preventDefault();
  window.confirm(`Remove blog ${blog.title} ${blog.author}`) &&
  dispatch(removeblog(blog))
}

      if (!blog) {
        return null
      }


  return (
    <div style={blogStyle} className="Blog">
      <div>
        {`${blog.title} ${blog.author}`}
        <div className="hidden">{blog.url}</div>
        <div>{`${blog.likes} likes `}
        <button onClick={updateBlog}>Like</button></div>
        <div>{blog.author}</div>
        <div>{`Added by ${blog.user && blog.user.username}`}</div>
        <button onClick={removeBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog
