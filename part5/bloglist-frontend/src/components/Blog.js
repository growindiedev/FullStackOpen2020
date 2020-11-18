import React, {useState} from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {
const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

const updateBlog = async (event) => {
  setLikes(likes + 1)
  const newBlog = {...blog, likes: likes}
  const response = await blogService.update(blog.id, newBlog)
}

const removeBlog = async (event) => {
  window.confirm(`Remove blog ${blog.title} ${blog.author}`) &&
  blogService.remove(blog.id)
}

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <Togglable label1="view" label2="hide">
        <div>{blog.url}</div>
        <div>{`likes ${blog.likes}`}<button onClick={updateBlog}>likes</button></div>
        <div>{blog.author}</div>
        <button onClick={removeBlog}>remove</button>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
