import React from 'react'
import Blog from './Blog'


const ShowBlogs = ({render}) => {
    const {blogs, user} = render
    return (<div>
      
      {blogs.map(blog =>
      
     blog.user && user.username && blog.user.username.toString() === user.username.toString() &&
        <Blog key={blog.id} blog={blog} />
      
      )}
    </div>)
  }

export default ShowBlogs
