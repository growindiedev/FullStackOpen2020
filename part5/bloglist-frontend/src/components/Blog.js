import React, {useState} from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
//const [likes, setLikes] = useState(blog.likes)
//const [count, setCount] = useState(0)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const updateBlog = async (event) => {
  //setLikes(prevLikes => prevLikes + 1)
  const newBlog = {...blog, likes: blog.likes + 1}
  const response = await blogService.update(blog.id, newBlog)
}

const removeBlog = async (event) => {
  window.confirm(`Remove blog ${blog.title} ${blog.author}`) &&
  blogService.remove(blog.id)
  //setCount(prevCount => prevCount + 1);  //using only for rerendering the component
}

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
