import React, {useEffect} from 'react'
import Togglable from './Togglable'
import {useDispatch} from 'react-redux'
import {updateLike, removeblog, setBlogs} from '../reducers/blogsReducer'



const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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

// useEffect(() => {
//   dispatch(setBlogs())
// }, [removeBlog])



  return (
    <div style={blogStyle} className="Blog">
      <div>
        {`${blog.title} ${blog.author}`}
        <Togglable label1="view" label2="hide">
        <div className="hidden">{blog.url}</div>
        <div>likes 
          <span data-cy="likes">
          {blog.likes}
          </span>
        <button onClick={updateBlog}>Like+</button></div>
        <div>{blog.author}</div>
        <button onClick={removeBlog}>remove</button>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
